import type { LucideIcon } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface ServiceCardProps {
  title: string
  description: string
  icon: LucideIcon
  id?: string
}

export default function ServiceCard({ title, description, icon: Icon, id }: ServiceCardProps) {
  return (
    <Card className="service-card h-full" id={id}>
      <CardHeader>
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
          <Icon className="h-6 w-6 text-primary" />
        </div>
        <CardTitle className="text-xl text-[#004B2D]">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-base text-[#004B2D]">{description}</CardDescription>
      </CardContent>
    </Card>
  )
}
