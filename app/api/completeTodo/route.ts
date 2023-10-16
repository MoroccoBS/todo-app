import { NextResponse } from "next/server";
import prisma from "@/lib/prisma-client";

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { todoId, completed } = body;

    if (!todoId || completed === undefined || completed === null) {
      return NextResponse.json(
        {
          error: "Todo id and todo are required",
        },
        { status: 400 }
      );
    }

    const Todo = await prisma.todo.update({
      where: {
        id: todoId,
      },
      data: {
        completed: completed,
      },
    });

    if (!Todo) {
      return NextResponse.json(
        {
          error: "Todo not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(Todo);
  } catch (error) {
    console.log(error);
  }
}
