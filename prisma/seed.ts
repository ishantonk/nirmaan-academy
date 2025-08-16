import { PrismaClient } from "@/app/generated/prisma";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
    /** ------------------------
     * Create Admin User
     * ------------------------ */
    const adminEmail = "admin@example.com";
    const adminPassword = "Admin@123"; // Ideally from environment variables

    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    const adminUser = await prisma.user.upsert({
        where: { email: adminEmail },
        update: {},
        create: {
            name: "Admin User",
            email: adminEmail,
            password: hashedPassword,
            role: "ADMIN",
        },
    });

    console.log(`✅ Admin user: ${adminUser.email}`);

    /** ------------------------
     * Create Default Website Setting
     * ------------------------ */
    const defaultWebsiteSetting = await prisma.websiteSetting.upsert({
        where: { id: "default-setting" },
        update: {},
        create: {
            id: "default-setting",
            applicationName: "Nirmaan Academy",
            tagline: "Empowering Learning Everywhere",
            bannerText:
                "NEED ASSISTANCE IN BUYING / ORDERING ? or ANY OTHER QUERY? CALL +91 9050363676   NOW [Office Timing 10AM to 7PM ]",
            supportEmail: "support@nirmaanacademy.com",
            supportPhone: "+91 9050363676",
            companyAddress: "Pan Oasis Sector 70 Noida",
            logo: "/logo.png",
            favicon: "/logo.png",
            metaTitle: "Nirmaan Academy - Learn & Grow",
            metaKeywords: "learning, education, courses, online school",
            metaDescription:
                "My Awesome App offers top-notch online learning experiences.",
        },
    });

    console.log(`✅ Website setting: ${defaultWebsiteSetting.applicationName}`);
}

main()
    .catch((e) => {
        console.error("❌ Seeding error:", e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
