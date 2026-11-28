import { JSX, useState } from "react";
import { Button } from "@/components/ui/button";
import { ResponsiveDialog } from "../../../../components/ui/responsive-dialog";

export const useConfirm = (
  title: string,
  description: string,
): [() => JSX.Element, () => Promise<unknown>] => {
  const [promise, setPromise] = useState<{
    resolve: (value: boolean) => void;
  } | null>(null);

  const confirm = () => {
    return new Promise((resolve) => {
      setPromise({ resolve });
    });
  };

  const handleClose = () => {
    setPromise(null);
  };

  const handleConfirm = () => {
    promise?.resolve(true);
    handleClose();
  };

  const handleCancel = () => {
    promise?.resolve(false);
    handleClose();
  };

  const ConfirmationDialog = () => (
    <ResponsiveDialog
      open={promise !== null}
      onOpenChange={handleClose}
      title={title}
      description={description}
    >
      <div className="pt-2 flex flex-col gap-y-4">
        <div className="rounded-lg bg-red-500/10 border border-red-500/20 px-3.5 py-2.5 text-xs text-red-600 font-medium">
          This action cannot be undone.
        </div>

        <div className="-mx-6 -mb-6 px-6 py-3.5 bg-slate-50/90 border-t border-slate-200/80 rounded-b-xl flex flex-col-reverse sm:flex-row sm:justify-end gap-2.5">
          <Button
            onClick={handleCancel}
            variant="outline"
            className="w-full sm:w-auto h-9 px-4 rounded-lg bg-white border-slate-200/90 text-slate-700 hover:bg-slate-100/80 hover:text-slate-900 hover:border-slate-300 font-medium text-[13px] tracking-tight shadow-2xs transition-all duration-150 cursor-pointer"
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirm}
            variant="destructive"
            className="w-full sm:w-auto h-9 px-4 rounded-lg bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-medium text-[13px] tracking-tight shadow-xs transition-all duration-150 cursor-pointer"
          >
            Confirm
          </Button>
        </div>
      </div>
    </ResponsiveDialog>
  );

  return [ConfirmationDialog, confirm];
};