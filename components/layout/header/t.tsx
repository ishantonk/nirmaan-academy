"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Search, ShoppingCart, Sun, Moon, Menu, X, Store } from "lucide-react";

interface HeaderProps {
    cartItemCount?: number;
    onSearch?: (query: string) => void;
    onLogin?: () => void;
    onSignup?: () => void;
    onCartClick?: () => void;
}

interface SearchBarProps {
    onSearch?: (query: string) => void;
    placeholder?: string;
}

interface CartIconProps {
    itemCount: number;
    onClick?: () => void;
}

interface ThemeToggleProps {
    compact?: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({
    onSearch,
    placeholder = "Search products...",
}) => {
    const [searchQuery, setSearchQuery] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSearch?.(searchQuery);
    };

    return (
        <form onSubmit={handleSubmit} className="form-control flex-1 max-w-md">
            <div className="input-group">
                <input
                    type="text"
                    placeholder={placeholder}
                    className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-primary"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    aria-label="Search products"
                />
                <button
                    type="submit"
                    className="btn btn-square btn-primary"
                    aria-label="Search"
                >
                    <Search className="h-4 w-4" />
                </button>
            </div>
        </form>
    );
};

const CartIcon: React.FC<CartIconProps> = ({ itemCount, onClick }) => {
    return (
        <button
            className="btn btn-ghost btn-circle relative"
            onClick={onClick}
            aria-label={`Shopping cart with ${itemCount} items`}
        >
            <ShoppingCart className="h-5 w-5" />
            {itemCount > 0 && (
                <div className="badge badge-error badge-sm absolute -top-1 -right-1 text-white">
                    {itemCount > 99 ? "99+" : itemCount}
                </div>
            )}
        </button>
    );
};

const ThemeToggle: React.FC<ThemeToggleProps> = ({ compact = false }) => {
    const { theme, setTheme, mounted } = useTheme();
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!mounted || !isClient) {
        return (
            <div
                className={`btn ${
                    compact ? "btn-sm" : ""
                } btn-ghost btn-circle`}
            />
        );
    }

    const toggleTheme = () => {
        setTheme(theme === "dark" ? "light" : "dark");
    };

    return (
        <button
            className={`btn ${
                compact ? "btn-sm" : ""
            } btn-ghost btn-circle transition-all duration-200`}
            onClick={toggleTheme}
            aria-label={`Switch to ${
                theme === "dark" ? "light" : "dark"
            } theme`}
        >
            {theme === "dark" ? (
                <Sun className={`${compact ? "h-4 w-4" : "h-5 w-5"}`} />
            ) : (
                <Moon className={`${compact ? "h-4 w-4" : "h-5 w-5"}`} />
            )}
        </button>
    );
};

const Header: React.FC<HeaderProps> = ({
    cartItemCount = 0,
    onSearch,
    onLogin,
    onSignup,
    onCartClick,
}) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    return (
        <header className="sticky top-0 z-50 w-full bg-base-100 shadow-sm">
            <div className="navbar px-4 lg:px-6">
                {/* Mobile menu button and logo */}
                <div className="navbar-start">
                    <div className="dropdown lg:hidden">
                        <button
                            tabIndex={0}
                            className="btn btn-ghost btn-circle"
                            onClick={toggleMobileMenu}
                            aria-label="Open menu"
                            aria-expanded={isMobileMenuOpen}
                        >
                            {isMobileMenuOpen ? (
                                <X className="h-5 w-5" />
                            ) : (
                                <Menu className="h-5 w-5" />
                            )}
                        </button>

                        {/* Mobile dropdown menu */}
                        {isMobileMenuOpen && (
                            <div
                                tabIndex={0}
                                className="menu dropdown-content mt-3 w-80 rounded-box bg-base-100 p-4 shadow-lg"
                            >
                                <div className="space-y-4">
                                    {/* Mobile search */}
                                    <div className="px-2">
                                        <SearchBar onSearch={onSearch} />
                                    </div>

                                    {/* Mobile actions */}
                                    <div className="flex items-center justify-between px-2">
                                        <CartIcon
                                            itemCount={cartItemCount}
                                            onClick={onCartClick}
                                        />
                                        <ThemeToggle compact />
                                    </div>

                                    {/* Mobile auth buttons */}
                                    <div className="flex flex-col gap-2 px-2">
                                        <button
                                            className="btn btn-outline btn-sm"
                                            onClick={() => {
                                                onLogin?.();
                                                closeMobileMenu();
                                            }}
                                        >
                                            Login
                                        </button>
                                        <button
                                            className="btn btn-primary btn-sm"
                                            onClick={() => {
                                                onSignup?.();
                                                closeMobileMenu();
                                            }}
                                        >
                                            Sign Up
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Logo */}
                    <div className="flex items-center gap-2 ml-2 lg:ml-0">
                        <Store className="h-6 w-6 text-primary" />
                        <span className="text-xl font-bold text-base-content">
                            ShopLogo
                        </span>
                    </div>
                </div>

                {/* Desktop center - Search bar */}
                <div className="navbar-center hidden lg:flex flex-1 max-w-2xl mx-8">
                    <SearchBar onSearch={onSearch} />
                </div>

                {/* Desktop end - Actions */}
                <div className="navbar-end gap-2">
                    <div className="hidden lg:flex items-center gap-2">
                        <CartIcon
                            itemCount={cartItemCount}
                            onClick={onCartClick}
                        />
                        <ThemeToggle />

                        {/* Auth buttons */}
                        <div className="flex gap-2 ml-2">
                            <button
                                className="btn btn-ghost btn-sm"
                                onClick={onLogin}
                            >
                                Login
                            </button>
                            <button
                                className="btn btn-primary btn-sm"
                                onClick={onSignup}
                            >
                                Sign Up
                            </button>
                        </div>
                    </div>

                    {/* Mobile - only cart and theme visible */}
                    <div className="flex items-center gap-1 lg:hidden">
                        <CartIcon
                            itemCount={cartItemCount}
                            onClick={onCartClick}
                        />
                    </div>
                </div>
            </div>

            {/* Mobile search bar - shown below main navbar */}
            <div className="lg:hidden px-4 pb-4 bg-base-100">
                <SearchBar onSearch={onSearch} />
            </div>
        </header>
    );
};

export default Header;
