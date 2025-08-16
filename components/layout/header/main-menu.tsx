export default function MainMenu() {
    return (
        <nav className="flex flex-row justify-center items-center">
            <ul className="menu menu-horizontal menu-sm">
                <li>
                    <a>Item 1</a>
                </li>
                <li>
                    <details>
                        <summary>Parent</summary>
                        <ul className="p-2">
                            <li>
                                <a>Submenu 1</a>
                            </li>
                            <li>
                                <a>Submenu 2</a>
                            </li>
                        </ul>
                    </details>
                </li>
                <li>
                    <a>Item 3</a>
                </li>
            </ul>
        </nav>
    );
}
