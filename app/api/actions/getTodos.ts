import prisma from "@/lib/prisma-client"
import { Todo } from "@prisma/client"
import { User } from "@prisma/client"

export default async function getTodos(user: User) {
    const todos = await prisma.todo.findMany({where: {userId : user.id}})
    return todos as Todo[]
}