import { AlertCircle } from "lucide-react";

type ErrorStateProps = {
  title?: string;
  description?: string;
};

export const ErrorState = ({
  title = "Something went wrong",
  description = "Failed to load data. Please try again.",
}: ErrorStateProps) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Crisp Professional Card */}
      <div className="w-full max-w-[300px] rounded-2xl border border-neutral-200/80 bg-white p-6 shadow-xl shadow-neutral-900/5">
        <div className="flex flex-col items-center text-center">
          
          {/* Soft Rose/Red Warning Icon Container */}
          <div className="mb-3.5 flex h-12 w-12 items-center justify-center rounded-xl border border-rose-100 bg-rose-50 text-rose-600">
            <AlertCircle className="h-5 w-5" />
          </div>

          {/* Typography */}
          <div className="space-y-1">
            <h4 className="text-sm font-semibold tracking-tight text-neutral-800">
              {title}
            </h4>
            <p className="text-xs text-neutral-500 leading-relaxed max-w-[220px]">
              {description}
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};