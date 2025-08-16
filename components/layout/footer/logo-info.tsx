import AspectRatio from "@/components/ui/aspect-ratio";
import ResponsiveImage from "@/components/ui/responsive-image";
import SiteInfo from "@/lib/site-info";
import { Mail, MapPinned, Phone } from "lucide-react";

export default function LogoInfo() {
    return (
        <aside>
            <div className="size-42">
                <AspectRatio ratio={4 / 3}>
                    <ResponsiveImage
                        src="/logo.png"
                        alt="Nirmaan academy"
                        className="object-contain"
                    />
                </AspectRatio>
            </div>
            <p>
                {SiteInfo.Title}
                <br />
                {SiteInfo.TagLine}
            </p>
            <p className="flex items-start gap-x-2">
                <span>
                    <MapPinned className="size-5" />
                </span>
                {SiteInfo.Address}
            </p>
            <p className="flex items-start gap-x-2">
                <span>
                    <Mail className="size-5" />
                </span>
                {SiteInfo.Email}
            </p>
            <p className="flex items-start gap-x-2">
                <span>
                    <Phone className="size-5" />
                </span>
                {SiteInfo.Phone}
            </p>
        </aside>
    );
}
