type ResetPasswordEmailProps = {
  name: string;
  resetToken: string;
};

export default function ResetPasswordEmail({
  name,
  resetToken,
}: ResetPasswordEmailProps) {
  const resetUrl = `${
    process.env.APP_URL ?? "http://localhost:3000"
  }/reset-password?token=${resetToken}`;

  return (
    <div style={{ fontFamily: "Arial", background: "#f4f4f4", padding: 40 }}>
      <div
        style={{
          maxWidth: 600,
          margin: "0 auto",
          background: "#fff",
          borderRadius: 8,
          padding: 40,
        }}
      >
        <h2>Reset Your Password</h2>
        <p>Hi {name},</p>
        <p>Click the button below to reset your password:</p>

        <div style={{ textAlign: "center", margin: "30px 0" }}>
          <a
            href={resetUrl}
            style={{
              padding: "14px 32px",
              background: "#007bff",
              color: "#fff",
              textDecoration: "none",
              borderRadius: 5,
              fontWeight: "bold",
            }}
          >
            Reset Password
          </a>
        </div>

        <p>This link will expire in 1 hour.</p>
        <p>If you didn’t request this, you can safely ignore this email.</p>
      </div>
    </div>
  );
}
