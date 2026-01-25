type SignupSuccessEmailProps = {
  name: string;
};

export default function SignupSuccessEmail({
  name,
}: SignupSuccessEmailProps) {
  return (
    <div style={{ fontFamily: "Arial, sans-serif" }}>
      <h1>Welcome to Souqza 🎉</h1>
      <p>Hi {name},</p>
      <p>Your account has been created successfully.</p>
      <p>You can now log in and start using the platform.</p>

      <p style={{ marginTop: 24 }}>
        — Team Souqza
      </p>
    </div>
  );
}
