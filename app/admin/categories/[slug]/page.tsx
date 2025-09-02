interface SubCategoriesProps {
  params: { slug?: string[] };
}

export default function SubCategoriesPage({ params }: SubCategoriesProps) {
  const slug = params.slug || [];

  // Simulate subcategory lookup
  const lastSlug = slug[slug.length - 1];

//   todo: return table for sub categories.
}
