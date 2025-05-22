import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { TaskStatus } from "@prisma/client"

const sampleTasks = [
  {
    title: "Complete Project Proposal",
    description: "Draft a comprehensive project proposal for the new client engagement. Include timeline, budget, and resource requirements.",
    status: "PENDING" as TaskStatus,
    priority: "HIGH",
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
  },
  {
    title: "Client Meeting Notes",
    description: "Document key points from the client meeting and share with the team. Include action items and follow-up tasks.",
    status: "IN_PROGRESS" as TaskStatus,
    priority: "MEDIUM",
    dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
  },
  {
    title: "Quarterly Report",
    description: "Prepare the quarterly performance report. Include metrics, achievements, and areas for improvement.",
    status: "PENDING" as TaskStatus,
    priority: "HIGH",
    dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days from now
  },
  {
    title: "Team Training Session",
    description: "Organize and conduct a training session on the new software tools. Prepare presentation and materials.",
    status: "PENDING" as TaskStatus,
    priority: "MEDIUM",
    dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
  },
  {
    title: "Website Content Update",
    description: "Update the company website with new content and images. Ensure all links are working properly.",
    status: "IN_PROGRESS" as TaskStatus,
    priority: "LOW",
    dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
  }
]

export async function POST() {
  try {
    // Get the first user to assign tasks to
    const user = await prisma.user.findFirst()
    if (!user) {
      return new NextResponse("No users found", { status: 404 })
    }

    // Create tasks
    const tasks = await Promise.all(
      sampleTasks.map(task =>
        prisma.task.create({
          data: {
            ...task,
            assigneeId: user.id,
            creatorId: user.id,
          },
          include: {
            assignee: true,
            creator: true,
          },
        })
      )
    )

    return NextResponse.json(tasks)
  } catch (error) {
    console.error("[TASKS_SEED]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
} 