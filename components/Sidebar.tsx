"use client"

import Link from "next/link";
import React, { Fragment } from "react";
import { Montserrat } from "next/font/google";
import {
  Code,
  ImageIcon,
  LayoutDashboard,
  MessageSquare,
  Music,
  Settings,
  VideoIcon,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Image from "next/image";
import FreeCounter from "@/components/FreeCounter";

const poppins = Montserrat({ weight: "600", subsets: ["latin"] });
const routes = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
    color: "text-sky-500",
  },
  {
    label: "Conversation",
    icon: MessageSquare,
    href: "/conversation",
    color: "text-violet-500",
  },
  {
    label: "Image Generation",
    icon: ImageIcon,
    color: "text-pink-700",
    href: "/image",
  },
  {
    label: "Video Generation",
    icon: VideoIcon,
    color: "text-orange-700",
    href: "/video",
  },
  {
    label: "Music Generation",
    icon: Music,
    color: "text-emerald-500",
    href: "/music",
  },
  {
    label: "Code Generation",
    icon: Code,
    color: "text-green-700",
    href: "/code",
  },
  {
    label: "Settings",
    icon: Settings,
    href: "/settings",
  },
];

type Props = {
  apiLimitCount: number;
  isPro: boolean;
}

const Sidebar = ({
  apiLimitCount = 0,
  isPro = false
}: Props) => {
  const pathname = usePathname()
  return (
    <aside className="flex flex-col h-full py-4 space-y-4 bg-[#111827] text-white">
      <nav className="flex-1 px-3 py-2">
        <Link href={"/dashboard"} className="flex items-center pl-3 mb-14">
          <div className="relative w-8 h-8 mr-4">
            <Image fill alt="Logo" src="/logo.png" />
          </div>
          <h1 className={cn("text-2xl font-bold", poppins.className)}>
            Genius
          </h1>
        </Link>
        <div className="space-y-1">
          {routes.map((route) => (
            <Link
              href={route.href}
              key={route.href}
              className={cn("flex justify-start w-full p-3 text-sm font-medium transition rounded-lg cursor-pointer group hover:text-white hover:bg-white/10",pathname === route.href ? "text-white bg-white/10": "text-zinc-400")}
            >
              <span className="flex items-center flex-1">
                <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
                {route.label}
              </span>
            </Link>
          ))}
        </div>
      </nav>
      <FreeCounter 
        apiLimitCount={apiLimitCount} 
        isPro={isPro}
      />
    </aside>
  );
};

export default Sidebar;
