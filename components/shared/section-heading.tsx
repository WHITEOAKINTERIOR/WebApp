// components/shared/section-heading.tsx
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  className?: string;
  highlightText?: string;
  highlightClassName?: string;
}

export function SectionHeading({
  title,
  subtitle,
  className,
  highlightText,
  highlightClassName = "text-primary-foreground px-2 rounded"
}: SectionHeadingProps) {
  return (
    <div className={cn("text-center mb-12", className)}>
      {subtitle && (
        <p className="text-sm font-medium text-muted-foreground mb-2">
          {subtitle}
        </p>
      )}
      <h3 className="text-xl md:text-3xl font-bold tracking-tight">
        {title}{"\u00a0"}
        {highlightText && (
          <span className={cn("relative inline-block group", highlightClassName)}>
            <span className="relative z-10">{highlightText}</span>
            <span 
              className="absolute inset-0 bg-primary -skew-x-6 transform transition-all duration-300 
                         z-1 rounded"
            />
          </span>
        )}
      </h3>
    </div>
  );
}