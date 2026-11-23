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
    <div className="mt-5 -mx-6 -mb-6 px-6 py-3.5 bg-slate-50/80 border-t border-slate-200/80 rounded-b-xl flex flex-col-reverse sm:flex-row sm:justify-end gap-2.5">
      <Button
        onClick={handleCancel}
        variant="outline"
        className="w-full sm:w-auto h-9 px-4 rounded-lg bg-white border-slate-200/90 text-slate-700 hover:bg-slate-100/80 hover:text-slate-900 hover:border-slate-300 font-medium text-[13px] tracking-tight shadow-2xs transition-all duration-150 cursor-pointer"
      >
        Cancel
      </Button>
      <Button
        onClick={handleConfirm}
        className="w-full sm:w-auto h-9 px-4 rounded-lg bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-medium text-[13px] tracking-tight shadow-xs ring-1 ring-inset ring-emerald-700/20 transition-all duration-150 cursor-pointer"
      >
        Confirm
      </Button>
    </div>
  </ResponsiveDialog>
);

  return [ConfirmationDialog, confirm];
};