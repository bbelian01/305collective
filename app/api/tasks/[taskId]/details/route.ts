import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

// GET /api/tasks/[taskId] - Get a specific task
export async function GET(
  req: Request,
  { params }: { params: { taskId: string } }
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const task = await prisma.task.findUnique({
      where: { id: params.taskId },
      include: {
        assignee: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        creator: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        files: true
      }
    })

    if (!task) {
      return NextResponse.json(
        { error: "Task not found" },
        { status: 404 }
      )
    }

    // If user is an employee, they can only view their own tasks
    if (session.user.role === "EMPLOYEE" && task.assigneeId !== session.user.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 403 }
      )
    }

    return NextResponse.json(task)
  } catch (error) {
    console.error("Error fetching task:", error)
    return NextResponse.json(
      { error: "Error fetching task" },
      { status: 500 }
    )
  }
}

// PATCH /api/tasks/[taskId] - Update a task
export async function PATCH(
  req: Request,
  { params }: { params: { taskId: string } }
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const task = await prisma.task.findUnique({
      where: { id: params.taskId }
    })

    if (!task) {
      return NextResponse.json(
        { error: "Task not found" },
        { status: 404 }
      )
    }

    // Only partners can update task details, employees can only update status
    const { status, title, description, assigneeId, dueDate } = await req.json()

    if (session.user.role === "EMPLOYEE") {
      if (task.assigneeId !== session.user.id) {
        return NextResponse.json(
          { error: "Unauthorized" },
          { status: 403 }
        )
      }

      // Employees can only update status
      if (status) {
        const updatedTask = await prisma.task.update({
          where: { id: params.taskId },
          data: { status },
          include: {
            assignee: {
              select: {
                id: true,
                name: true,
                email: true
              }
            },
            creator: {
              select: {
                id: true,
                name: true,
                email: true
              }
            }
          }
        })
        return NextResponse.json(updatedTask)
      }
    }

    // Partners can update all fields
    if (session.user.role === "PARTNER") {
      const updatedTask = await prisma.task.update({
        where: { id: params.taskId },
        data: {
          ...(title && { title }),
          ...(description && { description }),
          ...(assigneeId && { assigneeId }),
          ...(dueDate && { dueDate: new Date(dueDate) }),
          ...(status && { status })
        },
        include: {
          assignee: {
            select: {
              id: true,
              name: true,
              email: true
            }
          },
          creator: {
            select: {
              id: true,
              name: true,
              email: true
            }
          }
        }
      })
      return NextResponse.json(updatedTask)
    }

    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 403 }
    )
  } catch (error) {
    console.error("Error updating task:", error)
    return NextResponse.json(
      { error: "Error updating task" },
      { status: 500 }
    )
  }
}

// DELETE /api/tasks/[taskId] - Delete a task
export async function DELETE(
  req: Request,
  { params }: { params: { taskId: string } }
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    // Only partners can delete tasks
    if (session.user.role !== "PARTNER") {
      return NextResponse.json(
        { error: "Only partners can delete tasks" },
        { status: 403 }
      )
    }

    const task = await prisma.task.findUnique({
      where: { id: params.taskId }
    })

    if (!task) {
      return NextResponse.json(
        { error: "Task not found" },
        { status: 404 }
      )
    }

    await prisma.task.delete({
      where: { id: params.taskId }
    })

    return NextResponse.json({ message: "Task deleted successfully" })
  } catch (error) {
    console.error("Error deleting task:", error)
    return NextResponse.json(
      { error: "Error deleting task" },
      { status: 500 }
    )
  }
} 