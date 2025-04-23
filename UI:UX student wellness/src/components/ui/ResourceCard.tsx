
import React from "react";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { 
  Card,
  CardContent
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ResourceCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  variant?: "wellness" | "mint" | "calm" | "default";
  action?: {
    label: string;
    href: string;
  };
  className?: string;
}

const getColorClass = (variant: string) => {
  switch (variant) {
    case "wellness":
      return "bg-wellness-50 border-wellness-100";
    case "mint":
      return "bg-mint-50 border-mint-100";
    case "calm":
      return "bg-calm-50 border-calm-100";
    default:
      return "bg-background border-border";
  }
};

const getIconClass = (variant: string) => {
  switch (variant) {
    case "wellness":
      return "bg-wellness-100 text-wellness-600";
    case "mint":
      return "bg-mint-100 text-mint-600";
    case "calm":
      return "bg-calm-100 text-calm-600";
    default:
      return "bg-primary/10 text-primary";
  }
};

const ResourceCard: React.FC<ResourceCardProps> = ({
  title,
  description,
  icon: Icon,
  variant = "default",
  action,
  className,
}) => {
  return (
    <Card className={cn("overflow-hidden transition-all hover:shadow-md", 
      getColorClass(variant),
      className
    )}>
      <CardContent className="p-6">
        <div className={cn("rounded-lg w-12 h-12 flex items-center justify-center mb-4", getIconClass(variant))}>
          <Icon size={24} />
        </div>
        <h3 className="text-xl font-medium mb-2">{title}</h3>
        <p className="text-muted-foreground mb-6">{description}</p>
        {action && (
          <Button 
            asChild
            variant="default"
            className={cn(
              variant === "wellness" && "bg-wellness-600 hover:bg-wellness-700 text-white",
              variant === "mint" && "bg-mint-600 hover:bg-mint-700 text-white",
              variant === "calm" && "bg-calm-600 hover:bg-calm-700 text-white"
            )}
          >
            <a href={action.href}>{action.label}</a>
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default ResourceCard;
