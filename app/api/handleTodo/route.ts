import prisma from "@/lib/prisma-client";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { todo, userId, position } = body;

    if (!todo || !userId) {
      return NextResponse.json(
        { error: "Todo and email are required" },
        { status: 400 }
      );
    }

    const Todo = await prisma.todo.create({
      data: {
        content: todo,
        userId: userId,
        position: position,
      },
    });

    return NextResponse.json(Todo);
  } catch (error) {
    console.log(error);
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { todoId, position } = body;

    if (!todoId || !position) {
      return NextResponse.json(
        {
          error: "Todo id, todo, userId and position are required",
        },
        { status: 400 }
      );
    }

    const Todo = await prisma.todo.update({
      where: {
        id: todoId,
      },
      data: {
        position: position,
      },
    });

    return NextResponse.json(Todo);
  } catch (error) {
    console.log(error);
  }
}

export async function DELETE(request: Request) {
  try {
    const body = await request.json();
    const { todoId } = body;

    if (!todoId) {
      return NextResponse.json({ error: "Todo id is required" });
    }

    const Todo = await prisma.todo.delete({
      where: {
        id: todoId,
      },
    });

    return NextResponse.json(Todo);
  } catch (error) {
    console.log(error);
  }
}
