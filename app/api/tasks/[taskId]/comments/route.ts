import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function POST(
  request: Request,
  { params }: { params: { taskId: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const { content } = await request.json()
    if (!content) {
      return new NextResponse("Content is required", { status: 400 })
    }

    const task = await prisma.task.findUnique({
      where: { id: params.taskId },
      include: {
        comments: {
          include: {
            user: true
          },
          orderBy: {
            createdAt: "desc"
          }
        }
      }
    })

    if (!task) {
      return new NextResponse("Task not found", { status: 404 })
    }

    const comment = await prisma.comment.create({
      data: {
        content,
        taskId: params.taskId,
        userId: session.user.id
      },
      include: {
        user: true
      }
    })

    return NextResponse.json({
      ...task,
      comments: [...task.comments, comment]
    })
  } catch (error) {
    console.error("[TASK_COMMENTS_POST]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
} 