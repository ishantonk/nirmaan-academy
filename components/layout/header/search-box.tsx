import { Search } from "lucide-react";

export default function SearchBox() {
    return (
        <div className="flex">
            <label className="input min-w-xl">
                <Search className="size-5" />
                <input
                    className="w-full"
                    type="search"
                    required
                    placeholder="Search"
                />
            </label>
        </div>
    );
}
