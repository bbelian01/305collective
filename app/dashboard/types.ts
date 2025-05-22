export interface Task {
  id: string
  title: string
  description: string
  status: "PENDING" | "IN_PROGRESS" | "COMPLETED"
  priority: "LOW" | "MEDIUM" | "HIGH"
  dueDate: string
  assignee: {
    id: string
    name: string
    email: string
  }
  comments?: Comment[]
  attachments?: Attachment[]
  relatedTasks?: string[] // IDs of related tasks
}

export interface Comment {
  id: string
  content: string
  createdAt: string
  user: {
    id: string
    name: string
    email: string
  }
}

export interface Attachment {
  id: string
  name: string
  url: string
  type: string
  size: number
  uploadedAt: string
  uploadedBy: {
    id: string
    name: string
    email: string
  }
}

export interface Message {
  id: string
  content: string
  createdAt: string
  user: {
    id: string
    name: string
    email: string
  }
} 