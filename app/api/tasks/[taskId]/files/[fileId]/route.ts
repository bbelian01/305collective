import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { unlink } from "fs/promises"
import { join } from "path"

export async function DELETE(
  req: Request,
  { params }: { params: { taskId: string; fileId: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const attachment = await prisma.attachment.findUnique({
      where: { id: params.fileId },
      include: { uploadedBy: true, task: true },
    })
    if (!attachment) {
      return NextResponse.json({ error: "File not found" }, { status: 404 })
    }

    // Only allow the uploader or a partner to delete
    if (
      session.user.role !== "PARTNER" &&
      attachment.uploadedById !== session.user.id
    ) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    // Delete the file from disk if it exists
    if (attachment.url && attachment.url.startsWith("/uploads/")) {
      const filePath = join(process.cwd(), "public", attachment.url)
      try {
        await unlink(filePath)
      } catch (e) {
        // File might not exist, ignore
      }
    }

    // Delete the record from the database
    await prisma.attachment.delete({ where: { id: params.fileId } })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[FILE_DELETE]", error)
    return NextResponse.json({ error: "Internal error" }, { status: 500 })
  }
} 