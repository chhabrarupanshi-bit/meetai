"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
import { MeetingGetOne } from "../type";
import { meetingsInsertSchema } from "../../schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2 } from "lucide-react";

import { GeneratedAvatar } from "@/components/ui/generated-avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CommandSelect } from "@/components/ui/command-select";
import { toast } from "sonner";

import { NewAgentsDialog } from "../../../ui/components/new-agents-dailog";

interface MeetingFormProps {
  onSuccess?: (id?: string) => void;
  onCancel?: () => void;
  initialValues?: MeetingGetOne;
}

export const MeetingForm = ({
  onSuccess,
  onCancel,
  initialValues,
}: MeetingFormProps) => {
  const queryClient = useQueryClient();
  const trpc = useTRPC();

  const [openNewAgentDialog, setOpenNewAgentDialog] = useState(false);
  const [agentSearch, setAgentSearch] = useState("");

  const agents = useQuery(
    trpc.agents.getMany.queryOptions({
      pageSize: 100,
      search: agentSearch,
    }),
  );

  const createMeeting = useMutation(
    trpc.meetings.create.mutationOptions({
      onSuccess: async (data) => {
        await queryClient.invalidateQueries(
          trpc.meetings.getMany.queryOptions({}),
        );

        onSuccess?.(data.id);
      },
      onError: (error) => {
        toast.error(error.message);
      },
    }),
  );

  const updateMeeting = useMutation(
    trpc.meetings.update.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries(
          trpc.meetings.getMany.queryOptions({}),
        );

        if (initialValues?.id) {
          await queryClient.invalidateQueries(
            trpc.meetings.getOne.queryOptions({ id: initialValues.id }),
          );
        }

        onSuccess?.();
      },
      onError: (error) => {
        toast.error(error.message);
      },
    }),
  );

  const form = useForm<z.infer<typeof meetingsInsertSchema>>({
    resolver: zodResolver(meetingsInsertSchema),
    defaultValues: {
      name: initialValues?.name ?? "",
      agentId: initialValues?.agentId ?? "",
    },
  });

  const isEdit = !!initialValues?.id;
  const isPending = createMeeting.isPending || updateMeeting.isPending;

  const onSubmit = (values: z.infer<typeof meetingsInsertSchema>) => {
    if (isEdit) {
      updateMeeting.mutate({ ...values, id: initialValues.id });
    } else {
      createMeeting.mutate(values);
    }
  };

  return (
    <>
      <NewAgentsDialog
        open={openNewAgentDialog}
        onOpenChange={setOpenNewAgentDialog}
      />
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 pt-2">
        {/* 1. Meeting Name Input */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700 flex items-center justify-between">
            <span>Meeting Name</span>
            <span className="text-xs font-normal text-slate-400">Required</span>
          </label>
          <Input
            placeholder="e.g. Math Consultation"
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

        {/* 2. Agent Select Dropdown */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700 flex items-center justify-between">
            <span>Agent</span>
            <span className="text-xs font-normal text-slate-400">Required</span>
          </label>
          <CommandSelect
            options={(agents.data?.items ?? []).map((agent) => ({
              id: agent.id,
              value: agent.id,
              children: (
                <div className="flex items-center gap-x-2">
                  <GeneratedAvatar
                    seed={agent.name}
                    variant="botttsNeutral"
                    className="border size-6"
                  />
                  <span>{agent.name}</span>
                </div>
              ),
            }))}
            onSelect={(value) =>
              form.setValue("agentId", value, { shouldValidate: true })
            }
            onSearch={setAgentSearch}
            value={form.watch("agentId")}
            placeholder="Select an agent"
            className="w-full h-10"
          />
          <p className="text-xs text-slate-500">
            Not found what you&apos;re looking for?{" "}
            <button
              type="button"
              className="text-emerald-600 font-medium hover:underline cursor-pointer"
              onClick={() => setOpenNewAgentDialog(true)}
            >
              Create new agent
            </button>
          </p>
          {form.formState.errors.agentId && (
            <p className="text-xs font-medium text-red-500">
              {form.formState.errors.agentId.message}
            </p>
          )}
        </div>

        {/* 3. Action Buttons */}
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
              "Update Meeting"
            ) : (
              "Create Meeting"
            )}
          </Button>
        </div>
      </form>
    </>
  );
};