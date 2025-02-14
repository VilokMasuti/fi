// src/components/Filters.tsx

import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { FilterState } from '../lib/types';

interface FiltersProps {
  filters: FilterState;
  onFilterChange: (newFilters: Partial<FilterState>) => void;
}

export default function Filters({ filters, onFilterChange }: FiltersProps) {
  return (
    <div className="mb-6 flex flex-wrap gap-4">
      <Select
        value={filters.category || 'all'}
        onValueChange={(value) =>
          onFilterChange({ category: value === 'all' ? '' : value })
        }
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="">All Categories</SelectItem>
          <SelectItem value="electronics">Electronics</SelectItem>
          <SelectItem value="jewelery">Jewelery</SelectItem>
          <SelectItem value="men's clothing">Men&apos;s Clothing</SelectItem>
          <SelectItem value="women's clothing">Women&apos;s Clothing</SelectItem>
        </SelectContent>
      </Select>

      <Select
        value={filters.priceRange}
        onValueChange={(value) => onFilterChange({ priceRange: value })}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Price Range" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="">All Prices</SelectItem>
          <SelectItem value="0-50">$0 - $50</SelectItem>
          <SelectItem value="50-100">$50 - $100</SelectItem>
          <SelectItem value="100-">$100+</SelectItem>
        </SelectContent>
      </Select>

      <Select
        value={filters.sort}
        onValueChange={(value) =>
          onFilterChange({ sort: value as 'asc' | 'desc' | '' })
        }
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Sort by Price" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="">Default</SelectItem>
          <SelectItem value="asc">Low to High</SelectItem>
          <SelectItem value="desc">High to Low</SelectItem>
        </SelectContent>
      </Select>

      <Input
        type="text"
        value={filters.search}
        onChange={(e) => onFilterChange({ search: e.target.value })}
        placeholder="Search products..."
        className="w-full sm:w-auto"
      />
    </div>
  );
}
