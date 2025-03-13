import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function FooterNewsletter() {
    const [email, setEmail] = useState("");

    const handleSubscribe = (e: React.FormEvent) => {
        e.preventDefault();
        alert(`Subscribed with ${email}`);
        setEmail("");
    };

    return (
        <form
            onSubmit={handleSubscribe}
            className="flex items-center gap-2 w-full max-w-md"
        >
            <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1"
            />
            <Button type="submit">Subscribe</Button>
        </form>
    );
}
