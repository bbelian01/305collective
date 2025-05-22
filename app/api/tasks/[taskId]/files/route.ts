import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { writeFile, mkdir } from "fs/promises"
import { join } from "path"

export async function POST(
  req: Request,
  { params }: { params: { taskId: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const formData = await req.formData()
    const file = formData.get("file") as File
    if (!file) {
      return new NextResponse("No file provided", { status: 400 })
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Ensure uploads directory exists
    const uploadsDir = join(process.cwd(), "public", "uploads")
    await mkdir(uploadsDir, { recursive: true })

    // Save file to uploads directory
    const filePath = join(uploadsDir, file.name)
    await writeFile(filePath, buffer)

    // Store file info in the database
    const attachment = await prisma.attachment.create({
      data: {
        name: file.name,
        type: file.type,
        size: file.size,
        taskId: params.taskId,
        uploadedById: session.user.id,
        url: `/uploads/${file.name}`,
        driveFileId: "",
      },
      include: {
        uploadedBy: true,
      },
    })

    return NextResponse.json(attachment)
  } catch (error) {
    console.error("[TASK_FILE_UPLOAD]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}

export async function GET(
  req: Request,
  { params }: { params: { taskId: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const attachments = await prisma.attachment.findMany({
      where: {
        taskId: params.taskId,
      },
      include: {
        uploadedBy: true,
      },
    })

    return NextResponse.json(attachments)
  } catch (error) {
    console.error("[TASK_FILES_GET]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
} 