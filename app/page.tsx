import { categories } from '@/data/categories';
import Category from './components/Category';
import NewlyAdded from './components/NewlyAdded'; 

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <main className="py-8">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Keep discovering the best in AI</h1>
        
        {/* NewlyAdded 组件会在移动端自动隐藏 */}
        <NewlyAdded />
        
        {/* 现有的类别列表 */}
        {categories.map((category, index) => (
          <Category key={index} {...category} />
        ))}
      </main>
    </div>
  )
}