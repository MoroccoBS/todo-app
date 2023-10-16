"use server";

import getSession from "./getSession";
import prisma from "@/lib/prisma-client";

export default async function getUser() {
  try {
    const session = await getSession();
    if (!session?.user?.email) {
      return null;
    }
    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    });
    if (!user) {
      return null;
    }
    return user;
  } catch (error) {
    console.log(error);
  }
}
