"use client"

import { useState, useRef, useEffect } from "react"
import { Task, Comment, Attachment } from "./types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { format } from "date-fns"
import { Paperclip, Send, X, FileText, FileIcon, FileImage } from "lucide-react"
import { useSession } from "next-auth/react"
import { Progress } from "@/components/ui/progress"
import { toast } from "react-hot-toast"

interface TaskDetailsProps {
  task: Task
  onClose: () => void
  onCommentAdd: (taskId: string, content: string) => Promise<void>
  onAttachmentUpload: (taskId: string, file: File) => Promise<void>
  onRelatedTaskAdd: (taskId: string, relatedTaskId: string) => Promise<void>
}

const ALLOWED_FILE_TYPES = {
  'application/pdf': { icon: FileText, color: 'text-red-500' },
  'application/vnd.openxmlformats-officedocument.presentationml.presentation': { icon: FileText, color: 'text-orange-500' },
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': { icon: FileText, color: 'text-blue-500' },
  'image/jpeg': { icon: FileImage, color: 'text-green-500' },
  'image/png': { icon: FileImage, color: 'text-green-500' },
}

export function TaskDetails({
  task,
  onClose,
  onCommentAdd,
  onAttachmentUpload,
  onRelatedTaskAdd,
}: TaskDetailsProps) {
  const [newComment, setNewComment] = useState("")
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { data: session } = useSession()

  // Debug logging
  useEffect(() => {
    console.log("TaskDetails mounted with task:", task)
    console.log("File input ref:", fileInputRef.current)
  }, [task])

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newComment.trim()) return

    await onCommentAdd(task.id, newComment)
    setNewComment("")
  }

  const handleFileButtonClick = () => {
    console.log("Upload button clicked")
    console.log("File input ref:", fileInputRef.current)
    if (fileInputRef.current) {
      fileInputRef.current.click()
    } else {
      console.error("File input ref is null")
    }
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("File input change event triggered")
    const files = e.target.files
    if (!files?.length) {
      console.log("No files selected")
      return
    }

    console.log("Files selected:", files)
    setIsUploading(true)
    setUploadProgress(0)

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        console.log("Processing file:", file.name)
        const progress = ((i + 1) / files.length) * 100
        setUploadProgress(progress)

        await onAttachmentUpload(task.id, file)
      }
      toast.success("Files uploaded successfully")
      onClose()
    } catch (error) {
      console.error("Error uploading files:", error)
      toast.error(error instanceof Error ? error.message : "Failed to upload files")
    } finally {
      setIsUploading(false)
      setUploadProgress(0)
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }
    }
  }

  const handleAttachmentDelete = async (attachmentId: string) => {
    if (!confirm("Are you sure you want to delete this file?")) return;
    try {
      const response = await fetch(`/api/tasks/${task.id}/files/${attachmentId}`, {
        method: "DELETE",
      })
      if (!response.ok) {
        throw new Error("Failed to delete file")
      }
      toast.success("File deleted successfully")
      onClose()
    } catch (error) {
      toast.error("Failed to delete file")
    }
  }

  const getFileIcon = (type: string) => {
    const fileType = ALLOWED_FILE_TYPES[type as keyof typeof ALLOWED_FILE_TYPES]
    if (fileType) {
      const Icon = fileType.icon
      return <Icon className={`h-4 w-4 ${fileType.color}`} />
    }
    return <FileIcon className="h-4 w-4 text-gray-500" />
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
  }

  return (
    <Card className="w-full max-w-4xl">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="space-y-1">
          <CardTitle className="text-2xl">{task.title}</CardTitle>
          <div className="flex items-center space-x-2">
            <Badge>{task.status}</Badge>
            <Badge variant="outline">{task.priority}</Badge>
          </div>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="font-medium mb-2">Description</h3>
          <p className="text-gray-600">{task.description}</p>
        </div>

        <div>
          <h3 className="font-medium mb-2">Comments</h3>
          <div className="space-y-4">
            {task.comments?.map((comment) => (
              <div key={comment.id} className="flex space-x-4">
                <Avatar>
                  <AvatarFallback>
                    {getInitials(comment.user.name)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <p className="font-medium">{comment.user.name}</p>
                    <p className="text-sm text-gray-500">
                      {format(new Date(comment.createdAt), "MMM d, yyyy h:mm a")}
                    </p>
                  </div>
                  <p className="text-gray-600">{comment.content}</p>
                </div>
              </div>
            ))}
          </div>
          <form onSubmit={handleCommentSubmit} className="mt-4 space-y-2">
            <Textarea
              placeholder="Add a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <div className="flex justify-end">
              <Button type="submit" disabled={!newComment.trim()}>
                <Send className="mr-2 h-4 w-4" />
                Send
              </Button>
            </div>
          </form>
        </div>

        <div>
          <h3 className="font-medium mb-2">Attachments</h3>
          <div className="space-y-2">
            {task.attachments?.map((attachment) => (
              <div
                key={attachment.id}
                className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50"
              >
                <div className="flex items-center space-x-3">
                  {getFileIcon(attachment.type)}
                  <div>
                    <p className="font-medium">{attachment.name}</p>
                    <p className="text-sm text-gray-500">
                      {formatFileSize(attachment.size)} • Uploaded by {attachment.uploadedBy.name}
                    </p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" asChild>
                  <a href={attachment.url} target="_blank" rel="noopener noreferrer">
                    Download
                  </a>
                </Button>
                <Button variant="destructive" size="sm" onClick={() => handleAttachmentDelete(attachment.id)}>
                  Delete
                </Button>
              </div>
            ))}
          </div>
          <div className="mt-4 space-y-2">
            <Button
              variant="outline"
              size="sm"
              disabled={isUploading}
              onClick={() => { console.log("Button clicked"); handleFileButtonClick(); }}
              type="button"
            >
              <Paperclip className="mr-2 h-4 w-4" />
              {isUploading ? "Uploading..." : "Upload Files"}
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept=".pdf,.pptx,.docx,.doc,.jpg,.jpeg,.png"
              style={{ display: "block" }}
              onChange={handleFileUpload}
            />
            {isUploading && (
              <div className="space-y-2">
                <Progress value={uploadProgress} />
                <p className="text-sm text-gray-500">
                  Uploading... {Math.round(uploadProgress)}%
                </p>
              </div>
            )}
          </div>
        </div>

        {task.relatedTasks && task.relatedTasks.length > 0 && (
          <div>
            <h3 className="font-medium mb-2">Related Tasks</h3>
            <div className="space-y-2">
              {task.relatedTasks.map((relatedTaskId) => (
                <div
                  key={relatedTaskId}
                  className="p-2 border rounded hover:bg-gray-50 cursor-pointer"
                >
                  {/* We'll need to fetch and display related task details here */}
                  Task #{relatedTaskId}
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
} 