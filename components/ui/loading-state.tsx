import { Loader2 } from "lucide-react";

type LoadingStateProps = {
  title?: string;
  description?: string;
};

export const LoadingState = ({
  title = "Loading...",
  description = "Please wait while we load the data.",
}: LoadingStateProps) => {
  return (
    // Background pure neutral & transparent (no blur, no gradient effect)
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      
      {/* Crisp Professional Card */}
      <div className="w-full max-w-[300px] rounded-2xl border border-neutral-200/80 bg-white p-6 shadow-xl shadow-neutral-900/5">
        <div className="flex flex-col items-center text-center">
          
          {/* Subtle Green-Accent Spinner Container */}
          <div className="mb-3.5 flex h-12 w-12 items-center justify-center rounded-xl border border-emerald-100 bg-emerald-50">
            <Loader2 className="h-5 w-5 animate-spin text-emerald-600" />
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

          {/* Clean Emerald Progress Track */}
          <div className="mt-4 w-full px-2">
            <div className="h-1 w-full overflow-hidden rounded-full bg-neutral-100">
              <div className="h-full w-2/5 animate-[pulse_1.2s_ease-in-out_infinite] rounded-full bg-emerald-500" />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};