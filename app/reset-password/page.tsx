import Form from "./form";
import jwt from "jsonwebtoken";
import prisma from "@/lib/prisma";
interface Props {
  searchParams: Promise<{ token: string }>;
}

interface TokenPayload {
  exp: number;
  id: number;
  email: string;
  lat: number;
  token: string;
}
interface Record {
  token: string;
  used: boolean;
}

export default async function Page({ searchParams }: Props) {
  const { token } = await searchParams;
  let decoded: TokenPayload | null = null;
  let record: Record | null = null;
  if (token) {
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET!) as TokenPayload;
      record = (await prisma.passwordResetToken.findUnique({
        where: { token },
      })) as Record;

      if (record.used) {
        return (
          <div className="w-screen h-screen flex flex-col justify-center items-center  bg-white  p-8">
            <h1 className="text-2xl font-semibold text-center mb-2">
              This link has expired
            </h1>
            <p className="text-center text-gray-600">
              The password reset link is no longer valid. Please request a new
              one.
            </p>
          </div>
        );
      }
    } catch {
      decoded = null;
    }
  }

  if (!token || !decoded || decoded.exp < Date.now() / 1000) {
    return (
      <div className="w-screen h-screen flex flex-col justify-center items-center  bg-white  p-8">
        <h1 className="text-2xl font-semibold text-center mb-2">
          This link has expired
        </h1>
        <p className="text-center text-gray-600">
          The password reset link is no longer valid. Please request a new one.
        </p>
      </div>
    );
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-md p-8">
        <h1 className="text-2xl font-semibold text-center mb-6">
          Reset Password
        </h1>
        <Form token={token} />
      </div>
    </div>
  );
}
