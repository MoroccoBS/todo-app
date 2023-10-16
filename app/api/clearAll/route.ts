import { NextResponse } from "next/server";
import prisma from "@/lib/prisma-client";

export async function DELETE(request: Request) {
  const body = await request.json();
  const { userId } = body;

  if (!userId) {
    return NextResponse.json({ error: "User id is required" }, { status: 400 });
  }
  try {
    const todos = await prisma.todo.deleteMany({
      where: {
        completed: true,
        userId,
      },
    });

    return NextResponse.json(todos, {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    NextResponse.json(error, {
      status: 500,
    });
  }
}
