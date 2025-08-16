import type { Metadata } from "next";
import SiteInfo from "@/lib/site-info";
import RegisterForm from "@/components/form/register";

export const metadata: Metadata = {
    title: "Register | " + SiteInfo.Title,
    description: `Create an ${SiteInfo.Title} account`,
};

export default function RegisterPage() {
    return (
        <div className="py-4">
            <RegisterForm />
        </div>
    );
}
