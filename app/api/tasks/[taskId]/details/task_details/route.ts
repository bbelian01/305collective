import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const { id } = params
    const body = await request.json()
    const { status } = body

    if (!status || !["PENDING", "IN_PROGRESS", "COMPLETED"].includes(status)) {
      return new NextResponse("Invalid status", { status: 400 })
    }

    const task = await prisma.task.findUnique({
      where: { id },
      include: { assignee: true }
    })

    if (!task) {
      return new NextResponse("Task not found", { status: 404 })
    }

    // Only allow the assignee or a partner to update the task status
    if (session.user.role !== "PARTNER" && task.assignee.id !== session.user.id) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const updatedTask = await prisma.task.update({
      where: { id },
      data: { status },
      include: {
        assignee: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    })

    return NextResponse.json(updatedTask)
  } catch (error) {
    console.error("[TASK_UPDATE]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
} 