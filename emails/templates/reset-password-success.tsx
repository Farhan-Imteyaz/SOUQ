    type ResetPasswordSuccessEmailProps = {
      name: string;
    };
    
    export default function ResetPasswordSuccessEmail({
      name,
    }: ResetPasswordSuccessEmailProps) {
      return (
        <div style={{ fontFamily: "Arial, sans-serif" }}>
          <h1>Password Reset Successful</h1>
          <p>Hi {name},</p>
          <p>Your password has been reset successfully.</p>
          <p>You can now log in and start using the platform.</p>
    
          <p style={{ marginTop: 24 }}>
            — Team Souqza
          </p>
        </div>
      );
    }