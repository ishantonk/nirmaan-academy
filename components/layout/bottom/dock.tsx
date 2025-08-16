import { Home } from "lucide-react";

export default function Dock() {
    return (
        <div className="dock dock-md">
            <button>
                <Home className="size-5" />
                <span className="dock-label">Home</span>
            </button>

            <button className="dock-active">
                <Home className="size-5" />
                <span className="dock-label">Inbox</span>
            </button>

            <button>
                <Home className="size-5" />
                <span className="dock-label">Settings</span>
            </button>
        </div>
    );
}
