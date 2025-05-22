"use client"

import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"
import { Task } from "./types"

interface CalendarViewProps {
  tasks: Task[]
  onTaskClick: (task: Task) => void
}

export function CalendarView({ tasks, onTaskClick }: CalendarViewProps) {
  const [date, setDate] = useState<Date | undefined>(new Date())

  const getTasksForDate = (date: Date) => {
    return tasks.filter(task => {
      const taskDate = new Date(task.dueDate)
      return (
        taskDate.getDate() === date.getDate() &&
        taskDate.getMonth() === date.getMonth() &&
        taskDate.getFullYear() === date.getFullYear()
      )
    })
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

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card className="md:col-span-1">
        <CardHeader>
          <CardTitle>Calendar</CardTitle>
        </CardHeader>
        <CardContent>
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border"
          />
        </CardContent>
      </Card>
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>
            Tasks for {date ? format(date, "MMMM d, yyyy") : "Selected Date"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {date ? (
            <div className="space-y-4">
              {getTasksForDate(date).length === 0 ? (
                <p className="text-sm text-gray-500">No tasks due on this date</p>
              ) : (
                getTasksForDate(date).map((task) => (
                  <div
                    key={task.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 cursor-pointer"
                    onClick={() => onTaskClick(task)}
                  >
                    <div className="space-y-1">
                      <h3 className="font-medium">{task.title}</h3>
                      <p className="text-sm text-gray-500">{task.description}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={getPriorityColor(task.priority)}>
                        {task.priority}
                      </Badge>
                      <Badge variant="outline">
                        {task.assignee.name}
                      </Badge>
                    </div>
                  </div>
                ))
              )}
            </div>
          ) : (
            <p className="text-sm text-gray-500">Please select a date</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
} 