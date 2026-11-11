"use client";

import * as React from "react";
import { useIsMobile } from "@/hooks/use-mobile";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from "@/components/ui/drawer";

interface ResponsiveDialogProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  className?: string;
}

export const ResponsiveDialog = ({
  title,
  description,
  children,
  open,
  onOpenChange,
  className,
}: ResponsiveDialogProps) => {
  const isMobile = useIsMobile();

  // Mobile View: Bottom Sheet / Drawer with smooth drag & safe-area padding
  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerContent className="max-h-[90vh] focus:outline-none rounded-t-[20px] border-t bg-background">
          <DrawerHeader className="text-left px-5 pt-3 pb-2 border-b border-border/40">
            <DrawerTitle className="text-lg font-semibold tracking-tight text-foreground">
              {title}
            </DrawerTitle>
            {description && (
              <DrawerDescription className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                {description}
              </DrawerDescription>
            )}
          </DrawerHeader>

          {/* Scrollable container for mobile forms/keyboards */}
          <div className="p-5 overflow-y-auto max-h-[calc(90vh-100px)]">
            {children}
          </div>
        </DrawerContent>
      </Drawer>
    );
  }

  // Desktop View: Polished Modal with clean borders, shadows & structured spacing
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent 
        className={`sm:max-w-[480px] p-0 overflow-hidden rounded-2xl border border-border/60 shadow-2xl bg-background/95 backdrop-blur-sm duration-200 ${className ?? ""}`}
      >
        <DialogHeader className="px-6 pt-6 pb-4 border-b border-border/40 space-y-1">
          <DialogTitle className="text-xl font-semibold tracking-tight text-foreground">
            {title}
          </DialogTitle>
          {description && (
            <DialogDescription className="text-sm text-muted-foreground leading-relaxed">
              {description}
            </DialogDescription>
          )}
        </DialogHeader>

        <div className="p-6 max-h-[80vh] overflow-y-auto">
          {children}
        </div>
      </DialogContent>
    </Dialog>
  );
};