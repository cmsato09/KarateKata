"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
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
    </Sidebar>
  );
}
