"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle, Clock, FileText, LogOut, Search, Filter, ArrowUpDown, AlertCircle } from "lucide-react"
import { useEffect, useState } from "react"
import { useSession, signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import { NewTaskModal } from "./new-task-modal"
import { toast } from "sonner"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { CalendarView } from "./calendar-view"
import { TaskDetails } from "./task-details"
import { TeamChat } from "./team-chat"
import { Task, Message } from "./types"

export default function DashboardContent() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const userRole = session?.user?.role

  const [users, setUsers] = useState<{ id: string; name: string; email: string; role: string }[]>([])
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [priorityFilter, setPriorityFilter] = useState<string>("all")
  const [sortBy, setSortBy] = useState<string>("dueDate")
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)
  const [view, setView] = useState<"list" | "calendar">("list")
  const [messages, setMessages] = useState<Message[]>([])

  // Redirect to login if not authenticated
  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/login")
    }
  }, [status, router])

  const handleSignOut = async () => {
    await signOut({ redirect: false })
    router.replace("/login")
  }

  const fetchUsers = async () => {
    try {
      const response = await fetch("/api/users")
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      setUsers(data)
    } catch (error) {
      console.error("Error fetching users:", error)
      setUsers([])
    }
  }

  const fetchTasks = async () => {
    try {
      const response = await fetch("/api/tasks")
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      setTasks(data)
    } catch (error) {
      console.error("Error fetching tasks:", error)
      setTasks([])
    } finally {
      setLoading(false)
    }
  }

  const handleStatusChange = async (taskId: string, newStatus: Task["status"]) => {
    try {
      const response = await fetch(`/api/tasks/${taskId}/details`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      })

      if (!response.ok) {
        const error = await response.text()
        throw new Error(error || "Failed to update task status")
      }

      const updatedTask = await response.json()
      setTasks(tasks.map(task => 
        task.id === taskId ? { ...task, status: newStatus } : task
      ))
      toast.success("Task status updated")
    } catch (error) {
      console.error("Error updating task status:", error)
      toast.error(error instanceof Error ? error.message : "Failed to update task status")
    }
  }

  useEffect(() => {
    if (status === "authenticated") {
      if (userRole === "PARTNER") {
        fetchUsers()
      }
      fetchTasks()
    }
  }, [userRole, status])

  if (status !== "authenticated") {
    return null // or a loading spinner
  }

  const filteredTasks = tasks.filter(task => {
    if (userRole === "PARTNER") return true
    return task.assignee.id === session?.user?.id
  })

  const handleRoleChange = async (userId: string, newRole: string) => {
    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ role: newRole })
      })

      if (response.ok) {
        setUsers(users.map(user => user.id === userId ? { ...user, role: newRole } : user))
      }
    } catch (error) {
      console.error("Error updating user role:", error)
    }
  }

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
  }

  const getTaskStats = () => {
    const total = tasks.length
    const completed = tasks.filter(task => task.status === "COMPLETED").length
    const pending = tasks.filter(task => task.status === "PENDING").length
    const inProgress = tasks.filter(task => task.status === "IN_PROGRESS").length
    const highPriority = tasks.filter(task => task.priority === "HIGH").length

    return {
      total,
      completed,
      pending,
      inProgress,
      highPriority,
      completionRate: total ? Math.round((completed / total) * 100) : 0
    }
  }

  const getPriorityColor = (priority: Task["priority"]) => {
    switch (priority) {
      case "HIGH":
        return "bg-red-100 text-red-800"
      case "MEDIUM":
        return "bg-yellow-100 text-yellow-800"
      case "LOW":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusColor = (status: Task["status"]) => {
    switch (status) {
      case "COMPLETED":
        return "bg-green-100 text-green-800"
      case "IN_PROGRESS":
        return "bg-blue-100 text-blue-800"
      case "PENDING":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const filteredAndSortedTasks = tasks
    .filter(task => {
      const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.description.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesStatus = statusFilter === "all" || task.status === statusFilter
      const matchesPriority = priorityFilter === "all" || task.priority === priorityFilter
      return matchesSearch && matchesStatus && matchesPriority
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "dueDate":
          return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
        case "priority":
          const priorityOrder = { HIGH: 0, MEDIUM: 1, LOW: 2 }
          return priorityOrder[a.priority] - priorityOrder[b.priority]
        case "status":
          const statusOrder = { PENDING: 0, IN_PROGRESS: 1, COMPLETED: 2 }
          return statusOrder[a.status] - statusOrder[b.status]
        default:
          return 0
      }
    })

  const stats = getTaskStats()

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task)
  }

  const handleCommentAdd = async (taskId: string, content: string) => {
    try {
      const response = await fetch(`/api/tasks/${taskId}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content }),
      })

      if (!response.ok) {
        throw new Error("Failed to add comment")
      }

      const updatedTask = await response.json()
      setTasks(tasks.map(task => 
        task.id === taskId ? updatedTask : task
      ))
      toast.success("Comment added")
    } catch (error) {
      console.error("Error adding comment:", error)
      toast.error("Failed to add comment")
    }
  }

  const handleAttachmentUpload = async (taskId: string, file: File) => {
    try {
      const formData = new FormData()
      formData.append("file", file)

      const response = await fetch(`/api/tasks/${taskId}/files`, {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        const error = await response.text()
        throw new Error(error || "Failed to upload file")
      }

      const attachment = await response.json()
      setTasks(tasks.map(task => 
        task.id === taskId 
          ? { 
              ...task, 
              attachments: [...(task.attachments || []), attachment] 
            } 
          : task
      ))
      toast.success("File uploaded successfully")
    } catch (error) {
      console.error("Error uploading file:", error)
      toast.error(error instanceof Error ? error.message : "Failed to upload file")
      throw error
    }
  }

  const handleSendMessage = async (content: string) => {
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content }),
      })

      if (!response.ok) {
        throw new Error("Failed to send message")
      }

      const message = await response.json()
      setMessages([...messages, message])
    } catch (error) {
      console.error("Error sending message:", error)
      toast.error("Failed to send message")
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#F8F8F8] via-[#F5F5F5] to-[#E9F7F1] p-8">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-[#D96F32]">Dashboard</h1>
          <div className="flex items-center gap-4">
            {userRole === "PARTNER" && (
              <NewTaskModal onTaskCreated={fetchTasks} users={users} />
            )}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-[#D96F32] text-white">
                      {session?.user?.name ? getInitials(session.user.name) : "U"}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  className="text-red-600 cursor-pointer"
                  onClick={handleSignOut}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {userRole === "PARTNER" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Tasks</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.total}</div>
                <p className="text-xs text-muted-foreground">
                  {stats.completionRate}% completed
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending Tasks</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.pending}</div>
                <p className="text-xs text-muted-foreground">
                  {stats.inProgress} in progress
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Completed Tasks</CardTitle>
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.completed}</div>
                <p className="text-xs text-muted-foreground">
                  {stats.completionRate}% completion rate
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">High Priority</CardTitle>
                <AlertCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.highPriority}</div>
                <p className="text-xs text-muted-foreground">
                  Require immediate attention
                </p>
              </CardContent>
            </Card>
          </div>
        )}

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search tasks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="PENDING">Pending</SelectItem>
                <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
                <SelectItem value="COMPLETED">Completed</SelectItem>
              </SelectContent>
            </Select>
            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priority</SelectItem>
                <SelectItem value="HIGH">High</SelectItem>
                <SelectItem value="MEDIUM">Medium</SelectItem>
                <SelectItem value="LOW">Low</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="dueDate">Due Date</SelectItem>
                <SelectItem value="priority">Priority</SelectItem>
                <SelectItem value="status">Status</SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant={view === "list" ? "default" : "outline"}
              onClick={() => setView("list")}
            >
              List View
            </Button>
            <Button
              variant={view === "calendar" ? "default" : "outline"}
              onClick={() => setView("calendar")}
            >
              Calendar View
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            {view === "list" ? (
              <Tabs defaultValue="tasks" className="space-y-4">
                <TabsList>
                  <TabsTrigger value="tasks">My Tasks</TabsTrigger>
                  {userRole === "PARTNER" && (
                    <>
                      <TabsTrigger value="all-tasks">All Tasks</TabsTrigger>
                      <TabsTrigger value="users">Manage Users</TabsTrigger>
                    </>
                  )}
                  <TabsTrigger value="files">Files</TabsTrigger>
                </TabsList>

                <TabsContent value="tasks">
                  <div className="grid gap-4">
                    {loading ? (
                      <p>Loading tasks...</p>
                    ) : filteredAndSortedTasks.length === 0 ? (
                      <p>No tasks found</p>
                    ) : (
                      filteredAndSortedTasks.map((task) => (
                        <Card key={task.id}>
                          <CardHeader>
                            <div className="flex justify-between items-start">
                              <CardTitle className="text-xl">{task.title}</CardTitle>
                              <div className="flex gap-2">
                                <Badge className={getPriorityColor(task.priority)}>
                                  {task.priority}
                                </Badge>
                                <Badge className={getStatusColor(task.status)}>
                                  {task.status}
                                </Badge>
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <p className="text-sm text-gray-600 mb-4">{task.description}</p>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-4">
                                <div className="flex items-center space-x-2">
                                  <Clock className="h-4 w-4 text-gray-500" />
                                  <span className="text-sm text-gray-500">
                                    Due: {new Date(task.dueDate).toLocaleDateString()}
                                  </span>
                                </div>
                                <span className="text-sm text-gray-500">
                                  Assigned to: {task.assignee.name}
                                </span>
                              </div>
                              <div className="flex space-x-2">
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  onClick={() => handleTaskClick(task)}
                                >
                                  <FileText className="mr-2 h-4 w-4" />
                                  Upload
                                </Button>
                                {task.status !== "COMPLETED" && (
                                  <Button 
                                    size="sm" 
                                    className="bg-[#D96F32] text-white hover:bg-[#b35426]"
                                    onClick={() => handleStatusChange(task.id, "COMPLETED")}
                                  >
                                    <CheckCircle className="mr-2 h-4 w-4" />
                                    Complete
                                  </Button>
                                )}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))
                    )}
                  </div>
                </TabsContent>

                {userRole === "PARTNER" && (
                  <>
                    <TabsContent value="all-tasks">
                      <div className="grid gap-4">
                        {loading ? (
                          <p>Loading tasks...</p>
                        ) : filteredAndSortedTasks.length === 0 ? (
                          <p>No tasks found</p>
                        ) : (
                          filteredAndSortedTasks.map((task) => (
                            <Card key={task.id}>
                              <CardHeader>
                                <div className="flex justify-between items-start">
                                  <CardTitle className="text-xl">{task.title}</CardTitle>
                                  <div className="flex gap-2">
                                    <Badge className={getPriorityColor(task.priority)}>
                                      {task.priority}
                                    </Badge>
                                    <Badge className={getStatusColor(task.status)}>
                                      {task.status}
                                    </Badge>
                                  </div>
                                </div>
                              </CardHeader>
                              <CardContent>
                                <p className="text-sm text-gray-600 mb-4">{task.description}</p>
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center space-x-4">
                                    <div className="flex items-center space-x-2">
                                      <Clock className="h-4 w-4 text-gray-500" />
                                      <span className="text-sm text-gray-500">
                                        Due: {new Date(task.dueDate).toLocaleDateString()}
                                      </span>
                                    </div>
                                    <span className="text-sm text-gray-500">
                                      Assigned to: {task.assignee.name}
                                    </span>
                                  </div>
                                  <div className="flex space-x-2">
                                    <Button 
                                      variant="outline" 
                                      size="sm"
                                      onClick={() => handleStatusChange(task.id, task.status === "COMPLETED" ? "PENDING" : "COMPLETED")}
                                    >
                                      {task.status === "COMPLETED" ? "Mark Incomplete" : "Mark Complete"}
                                    </Button>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ))
                        )}
                      </div>
                    </TabsContent>
                    <TabsContent value="users">
                      <div className="grid gap-4">
                        {loading ? (
                          <p>Loading users...</p>
                        ) : users.length === 0 ? (
                          <p>No users found</p>
                        ) : (
                          users.map((user) => (
                            <Card key={user.id}>
                              <CardHeader>
                                <div className="flex justify-between items-center">
                                  <div className="flex items-center space-x-4">
                                    <Avatar>
                                      <AvatarFallback className="bg-[#D96F32] text-white">
                                        {getInitials(user.name)}
                                      </AvatarFallback>
                                    </Avatar>
                                    <div>
                                      <CardTitle className="text-xl">{user.name}</CardTitle>
                                      <p className="text-sm text-gray-500">{user.email}</p>
                                    </div>
                                  </div>
                                  <Badge className={user.role === "PARTNER" ? "bg-purple-100 text-purple-800" : "bg-blue-100 text-blue-800"}>
                                    {user.role}
                                  </Badge>
                                </div>
                              </CardHeader>
                              <CardContent>
                                <div className="flex justify-end">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleRoleChange(user.id, user.role === "EMPLOYEE" ? "PARTNER" : "EMPLOYEE")}
                                  >
                                    Change to {user.role === "EMPLOYEE" ? "Partner" : "Employee"}
                                  </Button>
                                </div>
                              </CardContent>
                            </Card>
                          ))
                        )}
                      </div>
                    </TabsContent>
                  </>
                )}
                <TabsContent value="files">
                  <div className="grid gap-4">
                    <h2 className="text-xl font-bold mb-4">Uploaded Files</h2>
                    {(() => {
                      // Gather all attachments from all tasks
                      const allFiles = tasks.flatMap(task =>
                        (task.attachments || []).map(attachment => ({
                          ...attachment,
                          taskTitle: task.title,
                          taskId: task.id,
                        }))
                      )
                      // Filter for employees
                      const filesToShow = userRole === "PARTNER"
                        ? allFiles
                        : allFiles.filter(file => file.uploadedBy.id === session?.user?.id)
                      if (filesToShow.length === 0) {
                        return <p>No files uploaded yet.</p>
                      }
                      return (
                        <div className="space-y-4">
                          {filesToShow.map(file => (
                            <div key={file.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                              <div className="flex items-center space-x-3">
                                <span className="font-medium">{file.name}</span>
                                <span className="text-sm text-gray-500">({file.type}, {Math.round(file.size / 1024)} KB)</span>
                                <span className="text-sm text-gray-500">Task: {file.taskTitle}</span>
                                <span className="text-sm text-gray-500">Uploaded by {file.uploadedBy.name}</span>
                              </div>
                              <div className="flex space-x-2">
                                <Button variant="ghost" size="sm" asChild>
                                  <a href={file.url} target="_blank" rel="noopener noreferrer">
                                    Download
                                  </a>
                                </Button>
                                <Button variant="destructive" size="sm" onClick={() => {
                                  // Remove the file from the UI (front-end only, no backend call)
                                  setTasks(tasks => {
                                    const updatedTasks = tasks.map(task =>
                                      task.id === file.taskId
                                        ? { ...task, attachments: (task.attachments || []).filter(att => att.id !== file.id) }
                                        : task
                                    );
                                    console.log("Updated tasks after delete (frontend only):", updatedTasks);
                                    return updatedTasks;
                                  });
                                  toast.success("File deleted from view");
                                }}>
                                  Delete
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )
                    })()}
                  </div>
                </TabsContent>
              </Tabs>
            ) : (
              <CalendarView
                tasks={tasks}
                onTaskClick={handleTaskClick}
              />
            )}
          </div>
          <div>
            <TeamChat
              messages={messages}
              onSendMessage={handleSendMessage}
            />
          </div>
        </div>

        {selectedTask && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <TaskDetails
              task={selectedTask}
              onClose={() => setSelectedTask(null)}
              onCommentAdd={handleCommentAdd}
              onAttachmentUpload={handleAttachmentUpload}
              onRelatedTaskAdd={async (taskId, relatedTaskId) => {
                // Implement related task functionality if needed
                console.log("Adding related task:", taskId, relatedTaskId)
              }}
            />
          </div>
        )}
      </div>
    </main>
  )
} 