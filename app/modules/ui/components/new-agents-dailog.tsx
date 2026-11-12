import { ResponsiveDialog } from "@/components/ui/responsive-dialog";
import { AgentForm } from "./agent-form";

interface NewAgentsDialogProps {
    open: boolean;
    onOpenChange : (open: boolean) => void;

}

export const NewAgentsDialog = ({
    open,
    onOpenChange,

}: NewAgentsDialogProps) => {

    return (
        <ResponsiveDialog
            open={open}
            onOpenChange={onOpenChange}
            title="New Agent"
            description="Create a new agent"
        >

            <AgentForm
                onSuccess={() => onOpenChange(false)}
                onCancel={() => onOpenChange(false)}
            />

        </ResponsiveDialog>

    )

}