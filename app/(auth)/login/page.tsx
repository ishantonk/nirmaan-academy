import type { Metadata } from "next";
import SiteInfo from "@/lib/site-info";
import LoginForm from "@/components/form/login";

export const metadata: Metadata = {
    title: "Login | " + SiteInfo.Title,
    description: `Login to your ${SiteInfo.Title} account`,
};

export default function RegisterPage() {
    return (
        <div className="py-4">
            <LoginForm />
        </div>
    );
}
