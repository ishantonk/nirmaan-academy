import {
  LayoutDashboard,
  Users,
  UserPlus,
  ShoppingCart,
  BookOpen,
  FileText,
  MessageCircle,
  Image,
  Megaphone,
  FilePlus,
  Layers,
  PenTool,
  Settings,
} from "lucide-react";

export type AdminSlug =
  | "dashboard"
  | "users"
  | "add-user"
  | "orders"
  | "categories"
  | "add-category"
  | "courses"
  | "add-course"
  | "ebooks"
  | "add-ebook"
  | "ebooks-categories"
  | "faqs"
  | "add-faq"
  | "pages"
  | "add-page"
  | "testimonials"
  | "add-testimonial"
  | "banners"
  | "add-banner"
  | "notices"
  | "add-notice"
  | "blogs"
  | "add-post"
  | "settings";

interface AdminNavItem {
  title: string;
  slug: AdminSlug | "*"; // "*" means inherit parent slug
  description: string;
  icon?: React.ElementType;
  subItems?: AdminNavItem[];
}

export const adminNavItems: AdminNavItem[] = [
  {
    title: "Dashboard",
    slug: "dashboard",
    description: "Overview of system stats",
    icon: LayoutDashboard,
  },
  {
    title: "User Management",
    slug: "users",
    description: "Add, edit, or remove users",
    icon: Users,
    subItems: [
      {
        title: "Add User",
        slug: "add-user",
        description: "Create a new user account",
        icon: UserPlus,
      },
      {
        title: "All Users",
        slug: "*",
        description: "View and manage all users",
        icon: Users,
      },
    ],
  },
  {
    title: "Orders",
    slug: "orders",
    description: "Manage course and e-book orders",
    icon: ShoppingCart,
  },
  {
    title: "Course Categories",
    slug: "categories",
    description: "Organize and manage course categories",
    icon: Layers,
    subItems: [
      {
        title: "Add Category",
        slug: "add-category",
        description: "Create a new course category",
        icon: FilePlus,
      },
      {
        title: "All Categories",
        slug: "*",
        description: "View and manage all course categories",
        icon: Layers,
      },
    ],
  },
  {
    title: "Courses",
    slug: "courses",
    description: "Create and manage courses",
    icon: BookOpen,
    subItems: [
      {
        title: "Add Course",
        slug: "add-course",
        description: "Create a new course",
        icon: FilePlus,
      },
      {
        title: "All Courses",
        slug: "*",
        description: "View and manage all courses",
        icon: BookOpen,
      },
    ],
  },
  {
    title: "E-Books",
    slug: "ebooks",
    description: "Upload and manage e-book resources",
    icon: FileText,
    subItems: [
      {
        title: "Add E-Book",
        slug: "add-ebook",
        description: "Upload a new e-book",
        icon: FilePlus,
      },
      {
        title: "All E-Books",
        slug: "*",
        description: "View and manage all e-books",
        icon: FileText,
      },
    ],
  },
  {
    title: "FAQs",
    slug: "faqs",
    description: "Manage frequently asked questions",
    icon: MessageCircle,
    subItems: [
      {
        title: "Add FAQ",
        slug: "add-faq",
        description: "Create a new FAQ entry",
        icon: FilePlus,
      },
      {
        title: "All FAQs",
        slug: "*",
        description: "View and manage all FAQs",
        icon: MessageCircle,
      },
    ],
  },
  {
    title: "Static Pages",
    slug: "pages",
    description: "Edit website static pages",
    icon: FileText,
    subItems: [
      {
        title: "Add Page",
        slug: "add-page",
        description: "Create a new static page",
        icon: FilePlus,
      },
      {
        title: "All Pages",
        slug: "*",
        description: "View and manage all static pages",
        icon: FileText,
      },
    ],
  },
  {
    title: "Testimonials",
    slug: "testimonials",
    description: "Manage user and client testimonials",
    icon: PenTool,
    subItems: [
      {
        title: "Add Testimonial",
        slug: "add-testimonial",
        description: "Create a new testimonial entry",
        icon: FilePlus,
      },
      {
        title: "All Testimonials",
        slug: "*",
        description: "View and manage all testimonials",
        icon: PenTool,
      },
    ],
  },
  {
    title: "Banners",
    slug: "banners",
    description: "Upload and manage homepage banners",
    icon: Image,
    subItems: [
      {
        title: "Add Banner",
        slug: "add-banner",
        description: "Create a new banner",
        icon: FilePlus,
      },
      {
        title: "All Banners",
        slug: "*",
        description: "View and manage all banners",
        icon: Image,
      },
    ],
  },
  {
    title: "Notices",
    slug: "notices",
    description: "Create and manage site-wide notices",
    icon: Megaphone,
    subItems: [
      {
        title: "Add Notice",
        slug: "add-notice",
        description: "Create a new notice",
        icon: FilePlus,
      },
      {
        title: "All Notices",
        slug: "*",
        description: "View and manage all notices",
        icon: Megaphone,
      },
    ],
  },
  {
    title: "Blog Posts",
    slug: "blogs",
    description: "Publish and edit blog content",
    icon: FileText,
    subItems: [
      {
        title: "Add Post",
        slug: "add-post",
        description: "Create a new blog post",
        icon: FilePlus,
      },
      {
        title: "All Posts",
        slug: "*",
        description: "View and manage all blog posts",
        icon: FileText,
      },
    ],
  },
  {
    title: "Settings",
    slug: "settings",
    description: "Update system configurations and preferences",
    icon: Settings,
  },
];
