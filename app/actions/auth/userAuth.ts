"use server";

import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import prisma from "@/lib/prisma";

export async function getCurrentUser() {
  const cookie = await cookies();
  const token = cookie.get("token")?.value;

  if (!token) {
    return { isLoggedIn: false, user: null };
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      id: string;
    };

    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: {
        id: true,
        email: true,
        firstName: true,
      },
    });

    if (!user) {
      return { isLoggedIn: false, user: null };
    }

    return {
      isLoggedIn: true,
      user,
    };
  } catch (err) {
    return { isLoggedIn: false, user: null };
  }
}
