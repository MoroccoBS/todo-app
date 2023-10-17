import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import prisma from "@/lib/prisma-client";
import { Todo } from "@prisma/client";
import { NextResponse } from "next/server";

// export default async function GET(req: Request) {
//   try {
//     const session = await getServerSession(authOptions);
//     if (!session?.user?.email) {
//       return NextResponse.json(
//         {
//           error: "No Session",
//         },
//         { status: 400 }
//       );
//     }
//     const user = await prisma.user.findUnique({
//       where: {
//         email: session.user.email,
//       },
//     });
//     if (!user) {
//       return NextResponse.json(
//         {
//           error: "User not found",
//         },
//         {
//           status: 404,
//         }
//       );
//     }
//     const todos = (await prisma.todo.findMany({
//       where: { userId: user.id },
//     })) as Todo[];
//     return NextResponse.json(todos);
//   } catch (error) {
//     console.log(error);
//   }
// }

export async function GET(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json(
      {
        error: "No Session",
      },
      { status: 400 }
    );
  }
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    });
    if (!user) {
      return NextResponse.json(
        {
          error: "User not found",
        },
        {
          status: 404,
        }
      );
    }
    if (!user) {
      return NextResponse.json(
        {
          error: "User not found",
        },
        {
          status: 404,
        }
      );
    }
    const todos = (await prisma.todo.findMany({
      where: { userId: user.id },
    })) as Todo[];
    return NextResponse.json(todos);
  } catch (error) {
    console.log(error);
  }
  return NextResponse.json({ message: "heello" });
}
