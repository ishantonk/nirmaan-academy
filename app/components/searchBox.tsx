'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";

export default function SearchBox() {
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Searching for:", searchQuery);
        // Implement search functionality
    };

    return(
        <div className="container mx-auto px-4">
                    <form onSubmit={handleSearch} className="flex">
                        <Input
                            type="text"
                            placeholder="Search for products"
                            className="rounded-r-none border-r-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <Button
                            type="submit"
                            className="rounded-l-none bg-site-primary hover:bg-site-secondary text-site-accent transition-colors duration-200 cursor-pointer"
                        >
                            <Search className="h-5 w-5" />
                        </Button>
                    </form>
                </div>
    )
}