import SiteInfo from "@/lib/site-info";

export default function Copyright() {
    return (
        <div className="footer sm:footer-horizontal footer-center bg-base-300 text-base-content p-4">
            <aside>
                <p>
                    Copyright © {new Date().getFullYear()} - All right reserved
                    by {SiteInfo.Title}
                </p>
            </aside>
        </div>
    );
}
