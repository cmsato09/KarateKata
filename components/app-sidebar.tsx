"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Link as LinkIcon } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const navigationLinks = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Katas",
    url: "/katas",
  },
  {
    title: "Stances",
    url: "/stances",
  },
  {
    title: "Techniques",
    url: "/techniques",
  },
  {
    title: "Kata Moves",
    url: "/kata-moves",
  },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar collapsible="offcanvas">
      <SidebarHeader>
        <div className="flex flex-col gap-0.5">
          <span className="font-semibold">Kata DB</span>
          <span className="text-xs text-sidebar-foreground/70">
            Karate Database
          </span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {navigationLinks.map((link) => (
            <SidebarMenuItem key={link.url}>
              <SidebarMenuButton asChild isActive={pathname === link.url}>
                <Link href={link.url}>
                  {link.icon ? <link.icon /> : <div className="size-4" />}
                  <span>{link.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <div className="flex flex-col gap-2 px-2 py-2">
          <div className="flex items-center justify-between text-xs text-sidebar-foreground/70">
            <span>Version 0.1.0</span>
            <a
              href="https://github.com/cmsato09/KarateKata"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-sidebar-foreground transition-colors"
            >
              <LinkIcon className="size-4" />
              <span>GitHub</span>
            </a>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
