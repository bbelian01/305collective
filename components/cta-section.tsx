import Link from "next/link"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface CTASectionProps {
  title: string
  description: string
  primaryButtonText: string
  primaryButtonLink: string
  secondaryButtonText?: string
  secondaryButtonLink?: string
  className?: string
}

export default function CTASection({
  title,
  description,
  primaryButtonText,
  primaryButtonLink,
  secondaryButtonText,
  secondaryButtonLink,
  className,
}: CTASectionProps) {
  return (
    <section className={cn("bg-muted py-16 md:py-24", className)}>
      <div className="container">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold">{title}</h2>
          <p className="text-lg text-[#004B2D]">{description}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button asChild size="lg" className="bg-[#004B2D] text-white hover:bg-[#006B3F]">
              {primaryButtonLink.startsWith('http') ? (
                <a href={primaryButtonLink} target="_blank" rel="noopener noreferrer">{primaryButtonText}</a>
              ) : (
                <Link href={primaryButtonLink}>{primaryButtonText}</Link>
              )}
            </Button>
            {secondaryButtonText && secondaryButtonLink && (
              <Button
                asChild
                size="lg"
                variant="outline"
                className="bg-white text-[#004B2D] border-2 border-[#004B2D] hover:bg-[#004B2D] hover:text-white transition-colors"
              >
                {secondaryButtonLink.startsWith('http') ? (
                  <a href={secondaryButtonLink} target="_blank" rel="noopener noreferrer">{secondaryButtonText}</a>
                ) : (
                  <Link href={secondaryButtonLink}>{secondaryButtonText}</Link>
                )}
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
