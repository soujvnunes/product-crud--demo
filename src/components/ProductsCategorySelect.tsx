import { getProductCategories } from '@/actions/getProductCategories'
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/Select'

export default async function ProductsCategorySelect() {
  const categories = await getProductCategories()

  return (
    <>
      <SelectTrigger className="w-40">
        <SelectValue placeholder="Categories" />
      </SelectTrigger>
      <SelectContent>
        {categories.map((category) => (
          <SelectItem
            key={category}
            value={category}>
            {category}
          </SelectItem>
        ))}
      </SelectContent>
    </>
  )
}
