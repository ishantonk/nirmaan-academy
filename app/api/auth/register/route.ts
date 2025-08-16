import { CreateUserSchema } from "@/lib/validators/user/create";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        // Parse JSON body
        const body = await request.json();

        // Validate with Zod using safeParse (avoids throwing an exception)
        const result = CreateUserSchema.safeParse(body);

        if (!result.success) {
            // Return structured validation errors
            return NextResponse.json(
                {
                    error: "Validation failed",
                    issues: result.error.issues.map((issue) => ({
                        field: issue.path.join("."),
                        message: issue.message,
                    })),
                },
                { status: 400 }
            );
        }

        const data = result.data;

        

        // TODO: Add your database logic here (example with Prisma)
        // const user = await prisma.user.create({ data });
    } catch (error) {
        // Log the error for debugging purposes
        console.error("Error on registering new user:", error);

        // Handle known specific error types here (e.g., database issues)
        if ((error as { code?: string }).code === "ECONNREFUSED") {
            return NextResponse.json(
                { error: "Database connection failed." },
                { status: 503 } // Service Unavailable
            );
        }

        // Return generic server error
        return NextResponse.json(
            { error: "Failed to register new user due to server error." },
            { status: 500 }
        );
    }
}
