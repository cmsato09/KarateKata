"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Link as LinkIcon } from "lucide-react";
import { SignInButton, UserButton, useUser } from "@clerk/nextjs";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

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
  const { isLoaded, isSignedIn, user } = useUser();

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
          {isLoaded && (
            <div className="flex items-center gap-2 pb-2 border-b border-sidebar-border">
              {isSignedIn ? (
                <div className="flex items-center gap-2 w-full">
                  <UserButton
                    appearance={{
                      elements: {
                        avatarBox: "h-8 w-8",
                      },
                    }}
                  />
                  <div className="flex flex-col overflow-hidden">
                    <span className="text-sm font-medium truncate">
                      {user.fullName || user.primaryEmailAddress?.emailAddress}
                    </span>
                    <span className="text-xs text-sidebar-foreground/70 truncate">
                      {user.primaryEmailAddress?.emailAddress}
                    </span>
                  </div>
                </div>
              ) : (
                <SignInButton mode="modal">
                  <Button className="w-full">Sign in</Button>
                </SignInButton>
              )}
            </div>
          )}
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
