"use client";

import { Bot } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";

interface ResponsiveDialogProps {
  title: string;
  description: string;
  children: React.ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ResponsiveDialog = ({
  title,
  description,
  children,
  open,
  onOpenChange,
}: ResponsiveDialogProps) => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerContent className="bg-white text-slate-900">
          <DrawerHeader className="border-b border-slate-100 pb-4 text-left">
            <div className="flex items-center gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-600">
                <Bot className="size-5" />
              </div>
              <div>
                <DrawerTitle className="text-lg font-bold tracking-tight text-slate-900">
                  {title}
                </DrawerTitle>
                <DrawerDescription className="text-xs text-slate-500 mt-0.5">
                  {description}
                </DrawerDescription>
              </div>
            </div>
          </DrawerHeader>
          <div className="p-4">{children}</div>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-white text-slate-900 sm:max-w-[480px] p-6 rounded-2xl border border-slate-200 shadow-2xl">
        <DialogHeader className="border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3.5">
            <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 text-white shadow-sm shadow-emerald-600/20">
              <Bot className="size-5" />
            </div>
            <div className="text-left">
              <DialogTitle className="text-lg font-bold tracking-tight text-slate-900">
                {title}
              </DialogTitle>
              <DialogDescription className="text-xs text-slate-500 mt-0.5">
                {description}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
};