"use client";

import { CreateCategoryInput, CreateCategorySchema } from "@/lib/validators";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";

export default function CategoryForm() {
    const [isLoading, setIsLoading] = React.useState<boolean>(false);

    const form = useForm<CreateCategoryInput>({
        resolver: zodResolver(CreateCategorySchema),
        mode: "onChange", // Live validation feedback
        defaultValues: {
            name: "",
            slug: "",
            description: "",
            isPopular: false,
            status: "ACTIVE",
            parentId: "",
            metaTitle: "",
            metaDescription: "",
            metaKeywords: "",
        },
    });

    return (
        // todo: add form...
    );
}