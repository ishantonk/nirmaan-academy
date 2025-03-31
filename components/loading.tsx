import { Loader2 } from "lucide-react";

export function Loading({ description }: { description?: string }) {
    return (
        <div className="flex flex-col items-center gap-2 max-w-md">
            <Loader2 className="h-10 w-10 animate-spin text-primary" />
            <h2 className="text-xl font-semibold text-center">Loading...</h2>
            {description && (
                <p className="text-sm text-muted-foreground">{description}</p>
            )}
        </div>
    );
}
