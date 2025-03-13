"use client";

import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

export default function MobileActions() {
    return (
        <div className="flex items-center space-x-4 ml-auto">
            <Button variant="ghost" size="icon" className="relative">
                <Search className="h-5 w-5" />
            </Button>
        </div>
    );
}
