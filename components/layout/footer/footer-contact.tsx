import { contactInformation } from "@/site-data";
import { Mail, MapPin, Phone } from "lucide-react";

export default function FooterContact() {
    return (
        <div className="space-y-4">
            <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 mt-0.5 flex-shrink-0" />
                <span>{contactInformation.address}</span>
            </div>
            <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 flex-shrink-0" />
                <span>{contactInformation.phone}</span>
            </div>
            <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 flex-shrink-0" />
                <span>{contactInformation.email}</span>
            </div>
        </div>
    );
}
