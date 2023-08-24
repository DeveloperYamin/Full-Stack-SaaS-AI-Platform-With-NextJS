import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import React from "react";

type Props = {
  title: string;
  description: string;
  icon: LucideIcon;
  iconColor?: string;
  bgColor?: string;
};

const Heading = ({
  title,
  description,
  icon: Icon,
  iconColor,
  bgColor,
}: Props) => {
  return (
    <header className="flex items-center px-4 lg:px-8 gap-x-3 mb:8">
      <div className={cn("p-2 w-fit rounded-md", bgColor)}>
        <Icon className={cn("h-10 w-10", iconColor)} />
      </div>
      <div>
        <h2 className="text-3xl font-bold" >{title}</h2>
        <p className="text-sm text-muted-foreground" >{description}</p>
      </div>
    </header>
  );
};

export default Heading;
