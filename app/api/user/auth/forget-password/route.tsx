import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import jwt from "jsonwebtoken";
import getClientIP from "@/lib/get-client-ip";
import { sendEmail } from "@/lib/sendEmail";
const EMAIL_LIMIT = 3;
const IP_LIMIT = 5;
const WINDOW_MINUTES = 10;
export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    const ip = getClientIP(req);
    console.log("Password reset request from IP:", ip);
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
        { status: 429 },
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
        { status: 200 },
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
      { expiresIn: "1h" },
    );
    await prisma.passwordResetToken.updateMany({
  where: {
    userId: user.id,
    used: false,
    expiresAt: { gt: new Date() },
  },
  data: {
    used: true,
  },
});

    await prisma.passwordResetToken.create({
      data: {
        userId: user.id,
        token,
        expiresAt,
        used: false,
      },
    });

    /* ----------------------------------
       Send email
    ---------------------------------- */
    try {
      await sendEmail({
        to: email,
        type: "resetPassword",
        props: {
          name: user.firstName,
          resetToken: token,
        },
      });
    } catch (emailError) {
      console.error("Email sending failed:", emailError);
    }

    return NextResponse.json(
      { message: "If the account exists, a reset link was sent." },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}
