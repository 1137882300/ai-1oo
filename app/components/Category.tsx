// app/components/Category.tsx
import { Category as CategoryType, Item } from '@/types';
import Link from 'next/link';

const CategoryItem: React.FC<{ item: Item }> = ({ item }) => (
  <Link href={item.link} target="_blank" rel="noopener noreferrer" className="block">
    <div className={`bg-gray-50 border border-gray-200 rounded p-2 text-center text-sm ${item.isNew ? 'bg-purple-100' : ''} hover:bg-gray-100 transition-colors`}>
      {item.isNew && <span className="text-yellow-500 mr-1">✨</span>}
      {item.name}
    </div>
  </Link>
);

const Category: React.FC<CategoryType> = ({ title, icon, items }) => {
  return (
    <section className="mb-8 bg-white rounded-xl p-6 shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold flex items-center">
          <span className="mr-2">{icon}</span>
          {title}
        </h2>
        <span className="bg-pink-100 text-pink-600 text-sm px-2 py-0.5 rounded-full">
          {items.length}
        </span>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
        {items.map((item, index) => (
          <CategoryItem key={index} item={item} />
        ))}
      </div>
    </section>
  )
}

export default Category;