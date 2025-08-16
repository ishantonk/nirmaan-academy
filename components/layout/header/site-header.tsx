import SearchBox from "./search-box";
import ActionMenu from "./action-menu";
import MainMenu from "./main-menu";
import AspectRatio from "@/components/ui/aspect-ratio";
import ResponsiveImage from "@/components/ui/responsive-image";

export default function SiteHeader() {
    return (
        <header className="shadow-md">
            <div className="navbar bg-base-100 container mx-auto">
                <div className="navbar-start h-16">
                    <AspectRatio ratio={1 / 1}>
                        <ResponsiveImage
                            src="/logo.png"
                            alt="Nirmaan academy"
                            className="object-contain"
                        />
                    </AspectRatio>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <SearchBox />
                </div>
                <div className="navbar-end">
                    <ActionMenu />
                </div>
            </div>
            <MainMenu />
        </header>
    );
}
