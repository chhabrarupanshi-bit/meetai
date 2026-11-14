"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
import { AgentGetOne } from "../type";
import { agentsInsertSchema } from "../../agents/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, Sparkles } from "lucide-react";

import { Textarea } from "@/components/ui/textarea";
import { GeneratedAvatar } from "@/components/ui/generated-avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface AgentFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
  initialValues?: AgentGetOne;
}

export const AgentForm = ({
  onSuccess,
  onCancel,
  initialValues,
}: AgentFormProps) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const trpc = useTRPC();

  const createagent = useMutation(
    trpc.agents.create.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries(
          trpc.agents.getMany.queryOptions(),
        );
        if (initialValues?.id) {
          await queryClient.invalidateQueries(
            trpc.agents.getOne.queryOptions({ id: initialValues.id }),
          );
        }
        onSuccess?.();
      },
      onError: (error) => {
        toast.error(error.message);
      },
    }),
  );

  const form = useForm<z.infer<typeof agentsInsertSchema>>({
    resolver: zodResolver(agentsInsertSchema),
    defaultValues: {
      name: initialValues?.name || "",
      instructions: initialValues?.instructions || "",
    },
  });

  const isEdit = !!initialValues?.id;
  const isPending = createagent.isPending;
  const watchedName = form.watch("name");

  const onSubmit = async (values: z.infer<typeof agentsInsertSchema>) => {
    if (isEdit) {
      console.log("Edit functionality not implemented yet");
    } else {
      createagent.mutate(values);
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 pt-2">
      {/* 1. Live Avatar Preview Card */}
      <div className="flex items-center gap-4 p-3.5 rounded-xl bg-gradient-to-r from-emerald-50/80 via-slate-50 to-emerald-50/40 border border-emerald-200/70">
        <div className="relative shrink-0">
          <GeneratedAvatar
            seed={watchedName || "Agent"}
            variant="botttsNeutral"
            className="size-16 rounded-full border-2 border-emerald-500/40 shadow-sm bg-white p-0.5"
          />
          <span className="absolute -bottom-0.5 -right-0.5 flex size-5 items-center justify-center rounded-full bg-emerald-600 text-white shadow">
            <Sparkles className="size-3" />
          </span>
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold uppercase tracking-wider text-emerald-700">
            Live Identity Preview
          </p>
          <p className="truncate text-base font-semibold text-slate-900 mt-0.5">
            {watchedName || "Your New AI Agent"}
          </p>
          <p className="text-xs text-slate-500">
            Avatar updates dynamically as you type the name
          </p>
        </div>
      </div>

      {/* 2. Name Input */}
      <div className="space-y-2">
        <label className="text-sm font-semibold text-slate-700 flex items-center justify-between">
          <span>Agent Name</span>
          <span className="text-xs font-normal text-slate-400">Required</span>
        </label>
        <Input
          placeholder="e.g. Math Tutor, Code Reviewer, Interview Coach"
          disabled={isPending}
          className="h-10 rounded-lg border-slate-200 bg-slate-50/50 px-3.5 text-sm text-slate-900 placeholder:text-slate-400 focus-visible:bg-white focus-visible:border-emerald-500 focus-visible:ring-2 focus-visible:ring-emerald-500/20 transition-all"
          {...form.register("name")}
        />
        {form.formState.errors.name && (
          <p className="text-xs font-medium text-red-500">
            {form.formState.errors.name.message}
          </p>
        )}
      </div>

      {/* 3. Instructions Textarea */}
      <div className="space-y-2">
        <label className="text-sm font-semibold text-slate-700 flex items-center justify-between">
          <span>System Instructions</span>
          <span className="text-xs font-normal text-slate-400">Behavior & Role</span>
        </label>
        <Textarea
          placeholder="Describe how this agent should behave, its tone, expertise, and rules..."
          disabled={isPending}
          className="min-h-[115px] resize-none rounded-lg border-slate-200 bg-slate-50/50 p-3.5 text-sm leading-relaxed text-slate-900 placeholder:text-slate-400 focus-visible:bg-white focus-visible:border-emerald-500 focus-visible:ring-2 focus-visible:ring-emerald-500/20 transition-all"
          {...form.register("instructions")}
        />
        {form.formState.errors.instructions && (
          <p className="text-xs font-medium text-red-500">
            {form.formState.errors.instructions.message}
          </p>
        )}
      </div>

      {/* 4. Action Buttons */}
      <div className="flex items-center justify-end gap-x-3 pt-3 border-t border-slate-100">
        {onCancel && (
          <Button
            type="button"
            variant="outline"
            disabled={isPending}
            onClick={onCancel}
            className="h-10 px-4 border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-900 rounded-lg font-medium transition-colors"
          >
            Cancel
          </Button>
        )}
        <Button
          type="submit"
          disabled={isPending}
          className="h-10 px-6 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium shadow-sm shadow-emerald-600/20 transition-all cursor-pointer"
        >
          {isPending ? (
            <span className="flex items-center gap-2">
              <Loader2 className="size-4 animate-spin" />
              {isEdit ? "Updating..." : "Creating..."}
            </span>
          ) : isEdit ? (
            "Update Agent"
          ) : (
            "Create Agent"
          )}
        </Button>
      </div>
    </form>
  );
};