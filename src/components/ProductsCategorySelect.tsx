import { getProductCategories } from '@/actions/getProductCategories'
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/Select'
import getAllCategories from '@/helpers/getAllCategories'

export default async function ProductsCategorySelect() {
  const categories = await getProductCategories()
  const allCategories = getAllCategories(categories)

  return (
    <>
      <SelectTrigger className="w-40">
        <SelectValue placeholder="Categories" />
      </SelectTrigger>
      <SelectContent>
        {allCategories.map((category) => (
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
