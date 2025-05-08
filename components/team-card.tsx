import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface TeamCardProps {
  name: string
  title: string
  bio: string
  imageSrc: string
}

export default function TeamCard({ name, title, bio, imageSrc }: TeamCardProps) {
  return (
    <Card className="team-card overflow-hidden h-full">
      <div className="relative h-64 w-full">
        <Image src={imageSrc || "/placeholder.svg"} alt={name} fill className="object-cover" />
      </div>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription className="text-accent font-medium">{title}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{bio}</p>
      </CardContent>
    </Card>
  )
}
