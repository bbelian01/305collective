import type { LucideIcon } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface ProcessCardProps {
  step: number
  title: string
  description: string
  icon: LucideIcon
}

export default function ProcessCard({ step, title, description, icon: Icon }: ProcessCardProps) {
  return (
    <Card className="process-card h-full">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white font-bold">
            {step}
          </div>
          <Icon className="h-6 w-6 text-primary" />
        </div>
        <CardTitle className="mt-4">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-base">{description}</CardDescription>
      </CardContent>
    </Card>
  )
}
