import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import jwt from "jsonwebtoken";
import { Resend } from "resend";
import getClientIP from "@/lib/get-client-ip";

const EMAIL_LIMIT = 3;
const IP_LIMIT = 10;
const WINDOW_MINUTES = 15;

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    const ip = getClientIP(req);

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const since = new Date(Date.now() - WINDOW_MINUTES * 60 * 1000);

    /* ----------------------------------
       Rate limiting (PasswordResetRequest)
    ---------------------------------- */
    const [emailCount, ipCount] = await Promise.all([
      prisma.passwordResetRequest.count({
        where: { email, createdAt: { gte: since } },
      }),
      prisma.passwordResetRequest.count({
        where: { ip, createdAt: { gte: since } },
      }),
    ]);

    if (emailCount >= EMAIL_LIMIT || ipCount >= IP_LIMIT) {
      return NextResponse.json(
        { error: "Too many reset attempts. Please try again later." },
        { status: 429 }
      );
    }

    // Log this attempt (important for rate limiting)
    await prisma.passwordResetRequest.create({
      data: { email, ip },
    });

    /* ----------------------------------
       Find user (no user enumeration)
    ---------------------------------- */
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json(
        { message: "If the account exists, a reset link was sent." },
        { status: 200 }
      );
    }

    /* ----------------------------------
       Create JWT + DB token
    ---------------------------------- */
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_SECRET!,
      { expiresIn: "1h" }
    );

    await prisma.passwordResetToken.create({
      data: {
        userId: user.id,
        token,
        expiresAt,
        used: false,
      },
    });

    const resetUrl = `${
      process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
    }/reset-password?token=${token}`;

    /* ----------------------------------
       Send email
    ---------------------------------- */
    try {
      await resend.emails.send({
        from: "onboarding@resend.dev",
        to: [email],
        subject: "Reset Your Password",
        html: `
<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background:#f4f4f4;font-family:Arial">
  <table width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td align="center" style="padding:40px">
        <table width="600" style="background:#fff;border-radius:8px;padding:40px">
          <tr>
            <td align="center">
              <h2>Reset Your Password</h2>
            </td>
          </tr>
          <tr>
            <td>
              <p>Hi ${user.firstName},</p>
              <p>Click the button below to reset your password:</p>
              <div style="text-align:center;margin:30px 0">
                <a href="${resetUrl}"
                  style="padding:14px 32px;background:#007bff;color:#fff;text-decoration:none;border-radius:5px;font-weight:bold">
                  Reset Password
                </a>
              </div>
              <p>This link will expire in 1 hour.</p>
              <p>If you didn't request this, you can safely ignore this email.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
        `,
        text: `Reset your password: ${resetUrl}`,
      });
    } catch (emailError) {
      console.error("Email sending failed:", emailError);
    }

    return NextResponse.json(
      { message: "If the account exists, a reset link was sent." },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
