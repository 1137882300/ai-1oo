import { NewlyAddedItem } from '@/types';
import { newlyAddedItems } from '@/data/categories';
import Link from 'next/link';

const NewlyAddedCard: React.FC<{ item: NewlyAddedItem }> = ({ item }) => (
  <Link href={item.link} target="_blank" rel="noopener noreferrer" className="block">
    <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
      <h3 className="text-lg font-semibold text-pink-600">{item.name}</h3>
      <p className="text-gray-600">{item.category}</p>
    </div>
  </Link>
);

const NewlyAdded = () => {
  return (
    <div className="hidden md:block mb-8"> {/* 添加 hidden md:block */}
      <section className="mb-8 bg-green-100 rounded-xl p-6 shadow-md">
        <h2 className="text-2xl font-bold mb-4 flex items-center">
          <span className="mr-2">✨</span>
          Newly Added
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {newlyAddedItems.map((item, index) => (
            <NewlyAddedCard key={index} item={item} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default NewlyAdded;
