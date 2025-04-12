
import { Outlet } from "react-router-dom";
import { DashboardNav } from "@/components/dashboard-nav";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useIsMobile } from "@/hooks/use-mobile";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function DashboardLayout() {
  const isMobile = useIsMobile();
  const [showMobileNav, setShowMobileNav] = useState(false);

  useEffect(() => {
    if (!isMobile) {
      setShowMobileNav(false);
    }
  }, [isMobile]);

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      {/* Desktop sidebar */}
      {!isMobile && <DashboardNav />}

      {/* Mobile sidebar */}
      {isMobile && showMobileNav && (
        <div 
          className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
          onClick={() => setShowMobileNav(false)}
        >
          <div
            className="fixed left-0 top-0 h-full w-[240px]"
            onClick={(e) => e.stopPropagation()}
          >
            <DashboardNav />
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Mobile header */}
        {isMobile && (
          <div className="flex h-16 items-center justify-between border-b px-4">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-md bg-primary flex items-center justify-center text-primary-foreground font-bold">
                F
              </div>
              <span className="text-xl font-bold">FinView</span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowMobileNav(!showMobileNav)}
              className={cn(
                "h-10 w-10 rounded-full",
                showMobileNav && "text-primary"
              )}
            >
              {showMobileNav ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        )}

        {/* Scrollable content */}
        <ScrollArea className="flex-1">
          <div className="container pb-8 pt-6">
            <Outlet />
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
