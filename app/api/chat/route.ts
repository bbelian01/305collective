import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const { content } = await request.json()
    if (!content) {
      return new NextResponse("Content is required", { status: 400 })
    }

    const message = await prisma.message.create({
      data: {
        content,
        userId: session.user.id
      },
      include: {
        user: true
      }
    })

    return NextResponse.json(message)
  } catch (error) {
    console.error("[CHAT_POST]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const messages = await prisma.message.findMany({
      include: {
        user: true
      },
      orderBy: {
        createdAt: "desc"
      },
      take: 50
    })

    return NextResponse.json(messages)
  } catch (error) {
    console.error("[CHAT_GET]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
} 