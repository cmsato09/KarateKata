"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
} from "@/components/ui/sidebar";

export function AppSidebar() {
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
          <SidebarMenuButton>
            Link 1
          </SidebarMenuButton>
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}
