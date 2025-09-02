"use client";

import { useCategories } from "@/hooks/use-category";

interface CategoryListTableProps {
  slug?: string;
}

export function CategoryListTable({ slug }: CategoryListTableProps) {
  const { data, isLoading, isError } = useCategories({
    q: slug,
    order: "desc",
    orderBy: "createdAt",
    take: 20,
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading categories.</p>;

  return (
    <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Sub Categories</th>
            <th>Popular</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data?.items.map((category, idx) => (
            <tr key={category.id}>
              <th>{idx + 1}</th>
              <td>{category.name}</td>
              <td>{category.parentId ? "yes" : "No"}</td>
              <td>{category.isPopular ? "Yes" : "No"}</td>
              <td>{category.status}</td>
              <td>edit</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
