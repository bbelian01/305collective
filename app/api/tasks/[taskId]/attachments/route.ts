import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { writeFile } from "fs/promises"
import { join } from "path"

export async function POST(
  request: Request,
  { params }: { params: { taskId: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const formData = await request.formData()
    const file = formData.get("file") as File
    if (!file) {
      return new NextResponse("File is required", { status: 400 })
    }

    const task = await prisma.task.findUnique({
      where: { id: params.taskId },
      include: {
        files: true
      }
    })

    if (!task) {
      return new NextResponse("Task not found", { status: 404 })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Create uploads directory if it doesn't exist
    const uploadsDir = join(process.cwd(), "public", "uploads")
    await writeFile(join(uploadsDir, file.name), buffer)

    const attachment = await prisma.file.create({
      data: {
        name: file.name,
        url: `/uploads/${file.name}`,
        type: file.type,
        size: file.size,
        taskId: params.taskId
      }
    })

    return NextResponse.json({
      ...task,
      files: [...task.files, attachment]
    })
  } catch (error) {
    console.error("[TASK_ATTACHMENTS_POST]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
} 