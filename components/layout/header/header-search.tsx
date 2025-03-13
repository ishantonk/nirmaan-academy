"use client";

import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { useDebounce } from "@/hooks/use-debounce";

export default function HeaderSearch() {
    const [query, setQuery] = useState("");
    const debouncedSearch = useDebounce(query, 300);

    // Effect to handle the debounced search
    useEffect(() => {
        if (debouncedSearch) {
            console.log("Searching for:", debouncedSearch);
            // Call your search API or filter function here
        }
    }, [debouncedSearch]);

    return (
        <div className="relative w-full max-w-lg mx-auto hidden lg:block">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
                type="search"
                placeholder="Search..."
                className="pl-8 appearance-none [&::-webkit-search-cancel-button]:hidden [&::-webkit-search-decoration]:hidden [&::-moz-search-clear-button]:hidden dark:bg-neutral-800/20 bg-neutral-200/20"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                aria-label="Search"
            />
            {query && (
                <button
                    onClick={() => setQuery("")}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                    <X className="h-4 w-4" />
                </button>
            )}
        </div>
    );
}
