import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  BarChart3,
  ChevronLeft,
  LayoutDashboard,
  LogOut,
  PieChart,
  Settings,
  User,
  Recycle,
} from "lucide-react";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function DashboardNav({ className, ...props }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const navItems = [
    {
      title: "Dashboard",
      href: "/",
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      title: "Portfolio",
      href: "/portfolio",
      icon: <PieChart className="h-5 w-5" />,
    },
    {
      title: "Stocks",
      href: "/stocks",
      icon: <BarChart3 className="h-5 w-5" />,
    },
    {
      title: "Transactions",
      href: "/transactions",
      icon: <ChevronLeft className="h-5 w-5 rotate-90" />,
    },
    {
      title: "EcoSnap",
      href: "/ecosnap",
      icon: <Recycle className="h-5 w-5" />,
    },
    {
      title: "Profile",
      href: "/profile",
      icon: <User className="h-5 w-5" />,
    },
    {
      title: "Settings",
      href: "/settings",
      icon: <Settings className="h-5 w-5" />,
    },
  ];

  return (
    <div
      className={cn(
        "flex h-screen flex-col justify-between border-r bg-sidebar text-sidebar-foreground transition-all duration-300",
        collapsed ? "w-[70px]" : "w-[240px]",
        className
      )}
      {...props}
    >
      <div className="px-3 py-4">
        <div className="mb-8 flex items-center justify-between px-2">
          {!collapsed && (
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-md bg-primary flex items-center justify-center text-primary-foreground font-bold">
                F
              </div>
              <span className="text-xl font-bold">FinView</span>
            </div>
          )}
          {collapsed && (
            <div className="h-8 w-8 rounded-md bg-primary mx-auto flex items-center justify-center text-primary-foreground font-bold">
              F
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCollapsed(!collapsed)}
            className="h-8 w-8"
          >
            <ChevronLeft
              className={cn(
                "h-4 w-4 transition-transform",
                collapsed && "rotate-180"
              )}
            />
          </Button>
        </div>
        <div className="space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors",
                location.pathname === item.href &&
                  "bg-sidebar-accent text-sidebar-accent-foreground",
                collapsed && "justify-center"
              )}
            >
              {item.icon}
              {!collapsed && <span>{item.title}</span>}
            </Link>
          ))}
        </div>
      </div>
      <div className="px-3 py-4 border-t flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          {!collapsed && (
            <div className="flex flex-col">
              <span className="text-xs font-medium opacity-70">Logged in as</span>
              <span className="text-sm font-medium">Alex Johnson</span>
            </div>
          )}
          <ThemeToggle />
        </div>
        <Button variant="ghost" size="icon" className="text-red-500">
          <LogOut className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
