import { dehydrate, QueryClient } from "@tanstack/react-query";
import { CategoryListTable } from "@/components/tables/category";
import QueryProvider from "@/lib/provider/query-provider";
import { getCategories } from "@/lib/api/category";
import { categoriesQueryKey } from "@/hooks/use-category";

export default async function CategoriesPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: categoriesQueryKey,
    queryFn: ({ signal }) => getCategories(undefined, signal),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <div>
      <h1>Categories</h1>
      <QueryProvider dehydratedState={dehydratedState}>
        <CategoryListTable />
      </QueryProvider>
    </div>
  );
}
