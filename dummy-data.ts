import { contactInformation } from "./site-data";

export const courses = [
    {
        id: 1,
        title: "Full-Stack Web Development",
        slug: "full-stack-web-development",
        category: "Technology",
        duration: "6 months",
        level: "Intermediate",
        language: "English",
        faculty: "John Doe",
        price: 599,
        discountedPrice: 499,
        isOnSale: true,
        description:
            "Learn to build web applications using HTML, CSS, JavaScript, React, Node.js, and databases.",
        thumbnail: "/1.png",
    },
    {
        id: 2,
        title: "Data Science & Machine Learning",
        slug: "data-science-machine-learning",
        category: "Technology",
        duration: "8 months",
        level: "Advanced",
        language: "English",
        faculty: "Dr. Emily Carter",
        price: 799,
        discountedPrice: 749,
        isOnSale: true,
        description:
            "Master Python, statistics, machine learning algorithms, and data visualization.",
        thumbnail: "/1.png",
    },
    {
        id: 3,
        title: "Digital Marketing & SEO",
        slug: "digital-marketing-seo",
        category: "Business",
        duration: "4 months",
        level: "Beginner",
        language: "English, Spanish",
        faculty: "Michael Roberts",
        price: 399,
        discountedPrice: 399,
        isOnSale: false,
        description:
            "Learn SEO, social media marketing, Google Ads, and email marketing strategies.",
        thumbnail: "/1.png",
    },
    {
        id: 4,
        title: "Financial Accounting & Management",
        slug: "financial-accounting-management",
        category: "Business",
        duration: "5 months",
        level: "Intermediate",
        language: "English",
        faculty: "Sarah Johnson",
        price: 499,
        discountedPrice: 449,
        isOnSale: true,
        description:
            "Understand financial statements, budgeting, and business finance essentials.",
        thumbnail: "/1.png",
    },
    {
        id: 5,
        title: "Graphic Design Fundamentals",
        slug: "graphic-design-fundamentals",
        category: "Design",
        duration: "3 months",
        level: "Beginner",
        language: "English, French",
        faculty: "David Smith",
        price: 299,
        discountedPrice: 249,
        isOnSale: true,
        description:
            "Learn Adobe Photoshop, Illustrator, and design principles for branding and UI/UX.",
        thumbnail: "/1.png",
    },
    {
        id: 6,
        title: "UI/UX Design & Prototyping",
        slug: "ui-ux-design-prototyping",
        category: "Design",
        duration: "6 months",
        level: "Intermediate",
        language: "English",
        faculty: "Jessica Lee",
        price: 599,
        discountedPrice: 599,
        isOnSale: false,
        description:
            "Master user experience design, wireframing, and prototyping using Figma & Adobe XD.",
        thumbnail: "/1.png",
    },
    {
        id: 7,
        title: "Nursing & Healthcare Management",
        slug: "nursing-healthcare-management",
        category: "Healthcare",
        duration: "9 months",
        level: "Advanced",
        language: "English",
        faculty: "Dr. William Brown",
        price: 899,
        discountedPrice: 799,
        isOnSale: true,
        description:
            "Explore patient care, medical ethics, and healthcare administration.",
        thumbnail: "/1.png",
    },
    {
        id: 8,
        title: "Introduction to Psychology",
        slug: "introduction-to-psychology",
        category: "Science",
        duration: "4 months",
        level: "Beginner",
        language: "English, German",
        faculty: "Prof. Anna Wilson",
        price: 349,
        discountedPrice: 349,
        isOnSale: false,
        description:
            "Study human behavior, cognitive processes, and psychological disorders.",
        thumbnail: "/1.png",
    },
];

export const wishlistData = [3, 6, 7, 8];
export const cartData = [1, 3];

export const imagesData = [
    {
        id: 1,
        caption: "Sunset at the Beach",
        imageUrl: "/1.jpg",
        imageAlt:
            "A beautiful sunset over the ocean with orange and purple hues.",
    },
    {
        id: 2,
        caption: "Mountain View",
        imageUrl: "/2.jpg",
        imageAlt: "A breathtaking view of mountains covered in mist.",
    },
    {
        id: 3,
        caption: "City Skyline",
        imageUrl: "/3.jpg",
        imageAlt: "A stunning city skyline at night with bright lights.",
    },
    {
        id: 4,
        caption: "Forest Trail",
        imageUrl: "/4.jpg",
        imageAlt: "A serene forest trail surrounded by lush greenery.",
    },
    {
        id: 5,
        caption: "Forest Trail",
        imageUrl: "/5.jpg",
        imageAlt: "A serene forest trail surrounded by lush greenery.",
    },
    {
        id: 9,
        caption: "Forest Trail",
        imageUrl: "/9.jpg",
        imageAlt: "A serene forest trail surrounded by lush greenery.",
    },
    {
        id: 10,
        caption: "Forest Trail",
        imageUrl: "/10.jpg",
        imageAlt: "A serene forest trail surrounded by lush greenery.",
    },
    {
        id: 11,
        caption: "Forest Trail",
        imageUrl: "/11.jpg",
        imageAlt: "A serene forest trail surrounded by lush greenery.",
    },
];

interface Notice {
    id: string;
    title: string;
    content: string;
    date: string;
    time?: string;
    category: "announcement" | "event" | "deadline";
    isPinned?: boolean;
}

export const notices: Notice[] = [
    {
        id: "1",
        title: "Final Exam Schedule Released",
        content:
            "The final examination schedule for the Spring semester has been published. Please check your student portal for detailed information.",
        date: "2024-05-15",
        time: "09:00 AM",
        category: "announcement",
        isPinned: true,
    },
    {
        id: "2",
        title: "Annual Science Fair",
        content:
            "Join us for the Annual Science Fair where students will showcase their innovative projects. Prizes to be won!",
        date: "2024-06-10",
        time: "10:00 AM",
        category: "event",
        isPinned: true,
    },
    {
        id: "3",
        title: "Assignment Submission Deadline",
        content:
            "Final project reports for Computer Science 101 must be submitted by end of day.",
        date: "2024-05-20",
        time: "11:59 PM",
        category: "deadline",
    },
    {
        id: "4",
        title: "Campus Maintenance Notice",
        content:
            "The main library will be closed for maintenance this weekend. Online resources will remain accessible.",
        date: "2024-05-18",
        category: "announcement",
    },
];

export const blogs = [
    {
        id: 1,
        title: "How to Build a Next.js App with Tailwind",
        slug: "nextjs-tailwind-guide",
        author: {
            name: "John Doe",
            role: "Senior Frontend Engineer",
            href: "#",
            imageUrl: "/images/authors/john-doe.jpg",
        },
        category: "Web Development",
        published_date: "2024-03-12",
        thumbnail: "/2-1.webp",
        excerpt:
            "Learn how to set up and optimize a Next.js app with Tailwind CSS for rapid development.",
        tags: ["Next.js", "Tailwind CSS", "Web Development"],
        is_featured: true,
    },
    {
        id: 2,
        title: "Understanding React Server Components",
        slug: "react-server-components",
        author: {
            name: "Jane Smith",
            role: "React Developer",
            href: "#",
            imageUrl: "/images/authors/jane-smith.jpg",
        },
        category: "React",
        published_date: "2024-02-28",
        thumbnail: "/2-1.webp",
        excerpt:
            "Discover how React Server Components improve performance and reduce bundle size.",
        tags: ["React", "Server Components", "Performance"],
        is_featured: false,
    },
    {
        id: 3,
        title: "Best Practices for Writing Accessible UI Components",
        slug: "accessible-ui-components",
        author: {
            name: "Alice Johnson",
            role: "UI/UX Designer",
            href: "#",
            imageUrl: "/images/authors/alice-johnson.jpg",
        },
        category: "Accessibility",
        published_date: "2024-01-20",
        thumbnail: "/2-1.webp",
        excerpt:
            "A guide to making your UI components accessible to all users, including those with disabilities.",
        tags: ["Accessibility", "UI Design", "Web Development"],
        is_featured: true,
    },
    {
        id: 4,
        title: "Optimizing Performance in Next.js 14",
        slug: "nextjs-performance-optimization",
        author: {
            name: "Michael Foster",
            role: "Co-Founder / CTO",
            href: "#",
            imageUrl: "/1.png",
        },
        category: "Performance",
        published_date: "2023-12-10",
        thumbnail: "/2-1.webp",
        excerpt:
            "Learn about the latest performance optimizations in Next.js 14 and how to implement them.",
        tags: ["Next.js", "Performance", "Optimization"],
        is_featured: false,
    },
    {
        id: 5,
        title: "State Management in React: Redux vs. Zustand",
        slug: "redux-vs-zustand",
        author: {
            name: "Sophia Williams",
            role: "Software Engineer",
            href: "#",
            imageUrl: "/images/authors/sophia-williams.jpg",
        },
        category: "State Management",
        published_date: "2023-11-05",
        thumbnail: "/2-1.webp",
        excerpt:
            "A comparison between Redux and Zustand for managing state in React applications.",
        tags: ["React", "Redux", "Zustand", "State Management"],
        is_featured: false,
    },
    {
        id: 6,
        title: "State Management in React: Redux vs. Zustand",
        slug: "redux-vs-zustand",
        author: {
            name: "Sophia Williams",
            role: "Software Engineer",
            href: "#",
            imageUrl: "/images/authors/sophia-williams.jpg",
        },
        category: "State Management",
        published_date: "2023-11-05",
        thumbnail: "/2-1.webp",
        excerpt:
            "A comparison between Redux and Zustand for managing state in React applications.",
        tags: ["React", "Redux", "Zustand", "State Management"],
        is_featured: false,
    },
    {
        id: 7,
        title: "State Management in React: Redux vs. Zustand",
        slug: "redux-vs-zustand",
        author: {
            name: "Sophia Williams",
            role: "Software Engineer",
            href: "#",
            imageUrl: "/images/authors/sophia-williams.jpg",
        },
        category: "State Management",
        published_date: "2023-11-05",
        thumbnail: "/2-1.webp",
        excerpt:
            "A comparison between Redux and Zustand for managing state in React applications.",
        tags: ["React", "Redux", "Zustand", "State Management"],
        is_featured: false,
    },
    {
        id: 8,
        title: "State Management in React: Redux vs. Zustand",
        slug: "redux-vs-zustand",
        author: {
            name: "Sophia Williams",
            role: "Software Engineer",
            href: "#",
            imageUrl: "/images/authors/sophia-williams.jpg",
        },
        category: "State Management",
        published_date: "2023-11-05",
        thumbnail: "/2-1.webp",
        excerpt:
            "A comparison between Redux and Zustand for managing state in React applications.",
        tags: ["React", "Redux", "Zustand", "State Management"],
        is_featured: false,
    },
    {
        id: 9,
        title: "State Management in React: Redux vs. Zustand",
        slug: "redux-vs-zustand",
        author: {
            name: "Sophia Williams",
            role: "Software Engineer",
            href: "#",
            imageUrl: "/images/authors/sophia-williams.jpg",
        },
        category: "State Management",
        published_date: "2023-11-05",
        thumbnail: "/2-1.webp",
        excerpt:
            "A comparison between Redux and Zustand for managing state in React applications.",
        tags: ["React", "Redux", "Zustand", "State Management"],
        is_featured: false,
    },
    {
        id: 10,
        title: "State Management in React: Redux vs. Zustand",
        slug: "redux-vs-zustand",
        author: {
            name: "Sophia Williams",
            role: "Software Engineer",
            href: "#",
            imageUrl: "/images/authors/sophia-williams.jpg",
        },
        category: "State Management",
        published_date: "2023-11-05",
        thumbnail: "/2-1.webp",
        excerpt:
            "A comparison between Redux and Zustand for managing state in React applications.",
        tags: ["React", "Redux", "Zustand", "State Management"],
        is_featured: false,
    },
    {
        id: 11,
        title: "State Management in React: Redux vs. Zustand",
        slug: "redux-vs-zustand",
        author: {
            name: "Sophia Williams",
            role: "Software Engineer",
            href: "#",
            imageUrl: "/images/authors/sophia-williams.jpg",
        },
        category: "State Management",
        published_date: "2023-11-05",
        thumbnail: "/2-1.webp",
        excerpt:
            "A comparison between Redux and Zustand for managing state in React applications.",
        tags: ["React", "Redux", "Zustand", "State Management"],
        is_featured: false,
    },
    {
        id: 12,
        title: "State Management in React: Redux vs. Zustand",
        slug: "redux-vs-zustand",
        author: {
            name: "Sophia Williams",
            role: "Software Engineer",
            href: "#",
            imageUrl: "/images/authors/sophia-williams.jpg",
        },
        category: "State Management",
        published_date: "2023-11-05",
        thumbnail: "/2-1.webp",
        excerpt:
            "A comparison between Redux and Zustand for managing state in React applications.",
        tags: ["React", "Redux", "Zustand", "State Management"],
        is_featured: false,
    },
    {
        id: 13,
        title: "State Management in React: Redux vs. Zustand",
        slug: "redux-vs-zustand",
        author: {
            name: "Sophia Williams",
            role: "Software Engineer",
            href: "#",
            imageUrl: "/images/authors/sophia-williams.jpg",
        },
        category: "State Management",
        published_date: "2023-11-05",
        thumbnail: "/2-1.webp",
        excerpt:
            "A comparison between Redux and Zustand for managing state in React applications.",
        tags: ["React", "Redux", "Zustand", "State Management"],
        is_featured: false,
    },
];

export const testimonials = [
    {
        id: 1,
        quote: "Joining Nirmaan Academy was the best decision for my B.Com journey. Prof. Nitin Bhardwaj (Law Baba) has a unique teaching style that simplifies even the most complex legal concepts. His real-life examples and engaging classes made learning enjoyable. Thanks to his guidance, I scored top marks in my law papers.",
        author: "Rohit Sharma",
        role: "B.Com Student",
        rating: 5,
    },
    {
        id: 2,
        quote: "Prof. Nitin Bhardwaj’s teaching method is exceptional. He ensures that every student understands the subject, no matter how challenging. His focus on practical learning and case studies prepared me well for my exams. Nirmaan Academy has truly shaped my academic growth.",
        author: "Priya Mehta",
        role: "B.Com Student",
        rating: 5,
    },
    {
        id: 3,
        quote: "I struggled with law concepts until I joined Nirmaan Academy. Prof. Nitin Bhardwaj's (Law Baba) simplified notes, combined with his interactive sessions, boosted my confidence. His mentorship was a game-changer for my B.Com studies.",
        author: "Arjun Verma",
        role: "B.Com Student",
        rating: 5,
    },
    {
        id: 4,
        quote: "I can confidently say that Nirmaan Academy has the best faculty for B.Com students. Prof. Nitin Bhardwaj's dedication to teaching is unmatched. His clear explanations, motivational support, and exam-focused strategies helped me excel.",
        author: "Sneha Kapoor",
        role: "B.Com Student",
        rating: 5,
    },
    {
        id: 5,
        quote: "Nirmaan Academy transformed my learning experience. Prof. Nitin Bhardwaj (Law Baba) is not just a teacher; he's a mentor who deeply cares about his students' success. His practical insights made law subjects easier to grasp, and I achieved amazing results because of his guidance.",
        author: "Aman Gupta",
        role: "B.Com Student",
        rating: 5,
    },
    {
        id: 6,
        quote: "I owe my success in B.Com to Nirmaan Academy and Prof. Nitin Bhardwaj. His simplified teaching style, doubt-clearing sessions, and focus on conceptual clarity made all the difference. I highly recommend Nirmaan Academy to every B.Com student seeking quality education.",
        author: "Ishita Malhotra",
        role: "B.Com Student",
        rating: 5,
    },
];

export const facultyMembers: {
    id: number;
    name: string;
    role: string;
    image: string;
}[] = [
    {
        id: 1,
        name: "Michael Foster",
        role: "Co-Founder / CTO",
        image: "/1.png",
    },
    {
        id: 2,
        name: "Dries Vincent",
        role: "Business Relations",
        image: "/2.png",
    },
    {
        id: 3,
        name: "Lindsay Walton",
        role: "Front-end Developer",
        image: "/3.png",
    },
    {
        id: 4,
        name: "Courtney Henry",
        role: "Designer",
        image: "/4.png",
    },
    {
        id: 5,
        name: "Tom Cook",
        role: "Director of Product",
        image: "/5.png",
    },
    {
        id: 6,
        name: "Whitney Francis",
        role: "Copywriter",
        image: "/2.png",
    },
];

export const aboutUsData = {
    title: "About Us – Nirmaan Academy",
    tagline: "Empowering Learners, Transforming Careers",
    description:
        "Nirmaan Academy is a premier education and e-learning platform dedicated to providing high-quality, career-oriented learning experiences. Founded by Prof. Nitin Bhardwaj, a seasoned educator with 14+ years of teaching experience, our academy is committed to shaping the future of students and professionals through expert-led courses in Business Law, Company Law, Finance, and Commerce.",
    values: {
        engaging: "Education should be engaging, accessible, and impactful.",
        innovative:
            "Our Storytelling Technique makes complex subjects easy to understand.",
        practical:
            "Students gain practical knowledge along with theoretical insights.",
    },
    why_choose_us: [
        "Expert-Led Learning – Courses designed and delivered by top industry professionals.",
        "Practical Approach – Real-world applications to bridge the gap between academics and industry.",
        "Flexible Learning – Learn through live sessions, recorded lectures, and face-to-face interactions.",
        "Proven Track Record – Thousands of students trained and mentored across India.",
        "Trusted by Top EdTech Brands – Faculty experience with Pearson ETEN CA, Stargate E-Learning Pvt. Ltd., and UNACADEMY.",
    ],
    vision_mission: {
        vision: "To make high-quality education accessible to every learner, helping them achieve academic and professional excellence.",
        mission:
            "To create an engaging learning environment that fosters knowledge, innovation, and career growth through expert guidance.",
    },
    founder: {
        name: "Prof. Nitin Bhardwaj",
        qualifications: ["CA (Semi-qualified)", "LLB", "M.COM", "B.COM"],
        experience:
            "14+ years of experience mentoring thousands of students in Business Law and Company Law.",
        achievements: [
            "University topper in M.COM & B.COM.",
            "Renowned for his Storytelling Technique, making complex legal concepts easy to understand.",
            "Faculty experience with Pearson ETEN CA, Stargate E-Learning Pvt. Ltd., and UNACADEMY.",
            "Taught extensively in Delhi NCR and across India, delivering impactful sessions in Face-to-Face and Live Online modes.",
        ],
    },
    contact: {
        address: contactInformation.address,
        email: contactInformation.email,
    },
};

export const privacyPolicyData = {
    title: "Privacy Policy",
    organization: "Nirmaan Academy",
    introduction:
        "Welcome to Nirmaan Academy. Your privacy is critically important to us. Nirmaan Academy is committed to respecting and protecting your privacy regarding any information we may collect while operating our website.",
    scope: "This Privacy Policy applies to www.nirmaanacademy.com and outlines how we collect, use, and safeguard your information.",
    information_we_collect: {
        website_visitors:
            "Nirmaan Academy collects non-personally identifiable information such as browser type, language preference, referring site, and date/time of each visitor request.",
        personal_information: [
            "Full Name",
            "Email Address",
            "Phone Number",
            "Mailing Address (if applicable)",
            "Payment details for course enrollment",
            "User account credentials",
            "Profile information such as preferences and interests related to educational content",
        ],
        third_party_signin:
            "If users sign in using third-party services such as Google or Facebook, we may collect basic profile information with their consent.",
    },
    how_we_use_information: [
        "Provide, operate, and maintain our website",
        "Personalize user experience by offering tailored courses and recommendations",
        "Process transactions and manage course enrollments",
        "Provide customer support and respond to inquiries",
        "Send promotional and administrative emails",
        "Conduct market research and analysis",
        "Improve website performance and content",
        "Prevent fraudulent activities and secure user data",
    ],
    data_security: {
        measures: [
            "SSL encryption for secure data transmission",
            "Restricted access to personal data by authorized personnel only",
            "Regular security audits and vulnerability assessments",
            "Secure payment processing through third-party payment gateways",
        ],
        disclaimer:
            "No method of transmission over the Internet or electronic storage is completely secure. While we strive to protect your data, we cannot guarantee absolute security.",
    },
    advertisements_tracking:
        "Ads on our website may use cookies, web beacons, or similar technologies to track online activities and display targeted advertisements.",
    third_party_links_services:
        "Our website may contain links to external sites, where their own Privacy Policy will apply. We are not responsible for third-party privacy practices.",
    disclosure_of_information: {
        cases: [
            "To employees, contractors, and trusted partners who require access to process transactions or provide educational services",
            "When required by law, court order, or government request",
            "To protect the rights, safety, and security of Nirmaan Academy, its users, and the public",
            "In case of business transfer, merger, or acquisition, where user data may be transferred",
        ],
    },
    data_retention_policy:
        "We retain personal information only as long as necessary to fulfill outlined purposes, after which data is anonymized or securely deleted unless legally required.",
    cookies_tracking:
        "To enhance browsing experience, we use cookies for session tracking, secure transactions, and personalized course recommendations. Users can control cookie settings via browser preferences.",
    children_privacy:
        "Nirmaan Academy does not knowingly collect personal information from children under 13. Parents can request data removal if a child has provided personal information.",
    ecommerce_transactions:
        "Purchases are processed securely through third-party payment gateways. We do not store sensitive payment details such as credit card numbers.",
    user_rights_choices: {
        rights: [
            "Access, update, or delete personal information",
            "Opt out of marketing communications",
            "Withdraw consent for data processing (where applicable)",
            "Request a copy of personal data",
        ],
        contact:
            "Users can exercise these rights by contacting support@nirmaanacademy.com.",
    },
    policy_updates:
        "Nirmaan Academy may update this Privacy Policy periodically. Continued use of our website after updates constitutes acceptance of the revised policy.",
    contact_information: {
        email: contactInformation.email,
        phone: contactInformation.phone,
        address: contactInformation.address,
        last_updated: "May 1, 2024",
    },
};

export const refundPolicyData = {
    title: "Return and Refund Policy for Nirmaan Academy",
    overview:
        "At Nirmaan Academy, we are committed to ensuring customer satisfaction with our educational services and products. This Return and Refund Policy outlines the terms under which refunds may be granted for purchased courses, study materials, and other digital content.",
    refund_eligibility: {
        request_period:
            "Refund requests must be made within 7 days of the original purchase date.",
        completion_limit:
            "Refunds will only be issued if the course or material has not been completed beyond 20% of its content.",
        purchase_condition:
            "Refunds are applicable only to courses and materials purchased directly through Nirmaan Academy. Purchases made through third-party platforms are subject to their refund policies.",
        subscription_policy:
            "Subscription-based services may be canceled at any time, but refunds will not be issued for partial or unused subscription periods.",
    },
    non_refundable_items: [
        "Downloadable study materials, e-books, PDFs, and other digital resources.",
        "One-on-one tutoring sessions or live classes that have already been attended.",
        "Courses purchased during promotional offers, discounts, or bundled deals.",
        "Any service that has been explicitly marked as non-refundable at the time of purchase.",
    ],
    refund_request_process: {
        submission:
            "Users must submit a refund request via email at support@nirmaanacademy.com with the following details:",
        required_details: [
            "Full name",
            "Order ID or receipt number",
            "Reason for the refund request",
            "Any relevant screenshots or supporting information",
        ],
        review_timeline:
            "Our support team will review the request within 5-7 business days and determine eligibility.",
        refund_processing:
            "If approved, the refund will be processed to the original payment method within 7-14 business days.",
    },
    course_cancellations_and_subscriptions: {
        subscription_cancellation:
            "Users may cancel a subscription at any time from their account settings.",
        billing_cycle:
            "If cancellation occurs before the next billing cycle, users will retain access until the end of the current cycle but will not receive a refund.",
        billing_errors:
            "Refunds for subscription-based services will be considered only if a billing error has occurred on our part.",
    },
    technical_issues: {
        reporting:
            "If a user is unable to access a purchased course due to technical errors on our platform, they must report the issue to our support team.",
        refund_eligibility:
            "Refunds may be issued if the issue remains unresolved within 72 hours of reporting.",
        device_incompatibility:
            "Users experiencing issues due to personal device incompatibility will not be eligible for a refund.",
    },
    fraud_and_abuse_policy: {
        fraudulent_requests:
            "Nirmaan Academy reserves the right to deny refund requests that appear to be fraudulent or abusive.",
        account_suspension:
            "Users found repeatedly requesting refunds while continuing to access courses may have their accounts suspended or terminated.",
    },
    policy_updates:
        "Nirmaan Academy may update this policy at any time. Users are encouraged to review it periodically. Continued use of Nirmaan Academy after policy updates constitutes acceptance of the revised terms.",
    contact_information: {
        email: contactInformation.email,
        phone: contactInformation.phone,
    },
};
