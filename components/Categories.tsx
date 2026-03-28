// components/Categories.tsx
import { getCategories } from "@/lib/categories"
import CategoriesUI from "./CategoriesUI"

export default async function Categories() {
  const categories = await getCategories()

  return <CategoriesUI categories={categories} />
}