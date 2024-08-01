// app/components/Category.tsx
import React from 'react';

interface CategoryProps {
    title: string;
    items: string[];
}

const Category: React.FC<CategoryProps> = ({ title, items }) => (
    <div className="bg-yellow-50 rounded-lg mb-5 text-left shadow-md">
        <h2 className="bg-green-100 text-gray-800 p-4 rounded-t-lg flex justify-between items-center">
            {title} <span className="count bg-green-200 text-gray-800 py-1 px-3 rounded-full">{items.length}</span>
        </h2>
        <ul className="bg-white rounded-b-lg max-h-64 overflow-y-auto">
            {items.map((item, index) => (
                <li key={index} className="border-t border-gray-200 p-4 flex justify-between items-center hover:bg-gray-100">
                    {item} <span className="arrow text-gray-400 text-xl">→</span>
                </li>
            ))}
        </ul>
    </div>
);

export default Category;