"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useCallback } from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"

interface CourseFiltersProps {
  categories: { id: string; slug: string; name: string }[]
}

export function CourseFilters({ categories }: CourseFiltersProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  // Get current filter values
  const currentCategory = searchParams.get("category") || ""
  const currentPrice = searchParams.get("price") || ""
  const currentSort = searchParams.get("sort") || ""
  const currentSearch = searchParams.get("search") || ""

  // Create a new URLSearchParams instance
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())

      if (value) {
        params.set(name, value)
      } else {
        params.delete(name)
      }

      return params.toString()
    },
    [searchParams],
  )

  // Handle category change
  const handleCategoryChange = (value: string) => {
    router.push(`/courses?${createQueryString("category", value)}`)
  }

  // Handle price change
  const handlePriceChange = (value: string) => {
    router.push(`/courses?${createQueryString("price", value)}`)
  }

  // Handle sort change
  const handleSortChange = (value: string) => {
    router.push(`/courses?${createQueryString("sort", value)}`)
  }

  // Handle reset filters
  const handleResetFilters = () => {
    router.push("/courses")
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Filters</CardTitle>
        <CardDescription>Refine your course search</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Categories */}
        <div>
          <h3 className="font-medium mb-3">Categories</h3>
          <RadioGroup value={currentCategory} onValueChange={handleCategoryChange} className="space-y-2">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="" id="category-all" />
              <Label htmlFor="category-all">All Categories</Label>
            </div>
            {categories.map((category) => (
              <div key={category.id} className="flex items-center space-x-2">
                <RadioGroupItem value={category.slug} id={`category-${category.slug}`} />
                <Label htmlFor={`category-${category.slug}`}>{category.name}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        <Separator />

        {/* Price */}
        <div>
          <h3 className="font-medium mb-3">Price</h3>
          <RadioGroup value={currentPrice} onValueChange={handlePriceChange} className="space-y-2">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="" id="price-all" />
              <Label htmlFor="price-all">All Prices</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="free" id="price-free" />
              <Label htmlFor="price-free">Free</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="paid" id="price-paid" />
              <Label htmlFor="price-paid">Paid</Label>
            </div>
          </RadioGroup>
        </div>

        <Separator />

        {/* Sort */}
        <div>
          <h3 className="font-medium mb-3">Sort By</h3>
          <RadioGroup value={currentSort} onValueChange={handleSortChange} className="space-y-2">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="" id="sort-default" />
              <Label htmlFor="sort-default">Newest</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="price-asc" id="sort-price-asc" />
              <Label htmlFor="sort-price-asc">Price: Low to High</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="price-desc" id="sort-price-desc" />
              <Label htmlFor="sort-price-desc">Price: High to Low</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="title-asc" id="sort-title-asc" />
              <Label htmlFor="sort-title-asc">Title: A-Z</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="title-desc" id="sort-title-desc" />
              <Label htmlFor="sort-title-desc">Title: Z-A</Label>
            </div>
          </RadioGroup>
        </div>

        {/* Reset Filters */}
        {(currentCategory || currentPrice || currentSort || currentSearch) && (
          <Button variant="outline" className="w-full" onClick={handleResetFilters}>
            Reset Filters
          </Button>
        )}
      </CardContent>
    </Card>
  )
}

