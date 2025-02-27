import { ProductCategory } from '@/actions/getProductCategories'

export const ALL_CATEGORY = 'all'

export type AllProductCategory = ProductCategory | typeof ALL_CATEGORY

export default function getAllCategories(
  params: ProductCategory[],
): AllProductCategory[] {
  return [...params, ALL_CATEGORY]
}
