"use client";

import { House, LogOut, ShieldUser, type LucideIcon } from "lucide-react";
import type { Route } from "next";
import type { Session } from "next-auth";
import { signOut } from "next-auth/react";
import NextLink from "next/link";
import { redirect, usePathname } from "next/navigation";

import { Button } from "~/components/ui/button";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "~/components/ui/sidebar";

interface NavigationItem {
  title: string;
  icon: LucideIcon;
  url?: Route;
  items?: Array<{ title: string; url: Route }>;
}

const navigationItems: Array<NavigationItem> = [
  { title: "Início", icon: House, url: "/" },
  {
    title: "Administração",
    icon: ShieldUser,
    url: "/admin",
    items: [
      // {
      //   title: "Gerenciar Aulas",
      //   url: "/admin/aulas",
      // },
      // {
      //   title: "Gerenciar FAQ",
      //   url: "/admin/faq",
      // },
      // {
      //   title: "Fale Conosco",
      //   url: "/admin/recados",
      // },
    ],
  },
];

interface AdminSidebarProps extends React.ComponentProps<typeof Sidebar> {
  session: Session;
}

export function AdminSidebar({ session, ...props }: AdminSidebarProps) {
  return (
    <Sidebar variant="floating" {...props}>
      <SidebarHeader>
        <NavUser {...session.user} />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            <NavigationMenu />
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}

function NavUser({
  fullName,
  nickname,
}: {
  fullName: string;
  nickname: string;
}) {
  const handleSignOut = async () => {
    await signOut({ redirect: false });
    redirect("/");
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton size="lg">
          <Button size="icon" asChild onClick={handleSignOut}>
            <div>
              <LogOut />
            </div>
          </Button>

          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-medium">{fullName}</span>
            <span className="font-xs truncate">@{nickname}</span>
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

function NavigationMenu() {
  const pathname = usePathname();

  return navigationItems.map(({ icon: Icon, title, url, items }) => (
    <SidebarMenuItem key={title}>
      <SidebarMenuButton
        className="font-medium"
        isActive={pathname === url}
        asChild
      >
        {url ? (
          <NextLink href={url}>
            <Icon /> {title}
          </NextLink>
        ) : (
          <span>
            <Icon /> {title}
          </span>
        )}
      </SidebarMenuButton>

      {items && items?.length > 0 && (
        <SidebarMenuSub>
          {items.map((subItem) => (
            <SidebarMenuSubItem key={`${title}-${subItem.title}`}>
              <SidebarMenuSubButton asChild isActive={pathname === subItem.url}>
                <NextLink href={subItem.url}>{subItem.title}</NextLink>
              </SidebarMenuSubButton>
            </SidebarMenuSubItem>
          ))}
        </SidebarMenuSub>
      )}
    </SidebarMenuItem>
  ));
}
