"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Resolver, useForm } from "react-hook-form";
import { type FieldType, Form, FormField } from "@/components/ui";
import { CreateCategoryInput, CreateCategorySchema } from "@/lib/validators";
import { CategoryDTO } from "@/lib/services";
import { useCategories, useCreateCategory } from "@/hooks/use-category";

type FieldConfig<T> = {
  type: FieldType;
  name: keyof T; // ensures name matches the form schema
  label: string;
  placeholder?: string;
  options?: { label: string; value: string }[];
};

export default function CategoryForm() {
  const { data, isLoading, isError } = useCategories();

  const form = useForm<CreateCategoryInput>({
    resolver: zodResolver(
      CreateCategorySchema
    ) as Resolver<CreateCategoryInput>,
    mode: "onChange",
    defaultValues: {
      slug: "",
      name: "",
      description: "",
      parentId: "",
      metaTitle: "",
      metaDescription: "",
      metaKeywords: "",
    },
  });

  // React Query Mutation
  const createCategoryMutation = useCreateCategory(() =>
    // Reset the form after successful creation
    form.reset()
  );

  const onSubmit = (values: CreateCategoryInput) => {
    createCategoryMutation.mutate(values);
  };

  const fields = getCategoryFields(data?.items, isLoading);

  return (
    <Form
      title="Create Category"
      subtitle="Fill out the category details below."
      onSubmit={form.handleSubmit(onSubmit)}
      isLoading={createCategoryMutation.isPending}
    >
      {fields.map((field) => (
        <FormField
          key={field.name}
          type={field.type as FieldType}
          name={field.name}
          label={field.label}
          placeholder={field.placeholder}
          options={field.options}
          register={form.register(field.name as keyof CreateCategoryInput)}
          error={
            form.formState.errors[
              field.name as keyof CreateCategoryInput
            ] as any
          }
          clearError={() => form.clearErrors(field.name as any)}
        />
      ))}

      <p>{form.getFieldState("slug").error?.message}</p>

      <button
        type="submit"
        disabled={createCategoryMutation.isPending}
        className="btn btn-primary"
      >
        {createCategoryMutation.isPending ? "Creating..." : "Create Category"}
      </button>
    </Form>
  );
}

const getCategoryFields = (
  categories: CategoryDTO[] | undefined,
  isLoading: boolean
): FieldConfig<CreateCategoryInput>[] => [
  {
    type: "input",
    name: "name",
    label: "Name",
    placeholder: "Category Name",
  },
  {
    type: "select",
    name: "parentId",
    label: "Parent Category",
    options: categories
      ? [
          { label: "None", value: "" },
          ...categories.map((category: CategoryDTO) => ({
            label: category.name,
            value: category.id,
          })),
        ]
      : [
          {
            label: isLoading ? "Loading..." : "No categories found",
            value: "",
          },
        ],
  },
  {
    type: "textarea",
    name: "description",
    label: "Description",
    placeholder: "Write description",
  },
  {
    type: "select",
    name: "status",
    label: "Status",
    options: [
      { label: "Active", value: "ACTIVE" },
      { label: "Inactive", value: "INACTIVE" },
    ],
  },
  {
    type: "checkbox",
    name: "isPopular",
    label: "Popular",
  },
  {
    type: "input",
    name: "metaTitle",
    label: "Meta Title",
    placeholder: "SEO title",
  },
  {
    type: "textarea",
    name: "metaDescription",
    label: "Meta Description",
    placeholder: "SEO description",
  },
  {
    type: "input",
    name: "metaKeywords",
    label: "Meta Keywords",
    placeholder: "keyword1, keyword2",
  },
];
