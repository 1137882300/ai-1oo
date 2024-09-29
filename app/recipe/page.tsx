"use client"

import { useState } from 'react';

// 扩展的菜谱数据库
const recipeDatabase = [
  { 
    name: "宫保鸡丁", 
    type: "荤",
    ingredients: ["鸡肉", "花生", "黄瓜", "辣椒"],
    method: "1. 将鸡肉切成丁，用盐、料酒腌制。\n2. 花生米炒熟备用。\n3. 热油锅，爆香姜蒜，加入鸡丁翻炒。\n4. 加入花生、黄瓜丁和辣椒，调味后即可出锅。"
  },
  { 
    name: "麻婆豆腐", 
    type: "荤",
    ingredients: ["豆腐", "肉末", "豆瓣酱", "花椒"],
    method: "1. 豆腐切块，肉末炒香。\n2. 加入豆瓣酱炒出香味。\n3. 加入豆腐块和适量水，煮至入味。\n4. 最后撒上花椒粉即可。"
  },
  { 
    name: "清炒时蔬", 
    type: "素",
    ingredients: ["各种时令蔬菜", "蒜", "盐"],
    method: "1. 时蔬洗净切好。\n2. 热锅下油，爆香蒜末。\n3. 加入蔬菜快速翻炒。\n4. 加盐调味，保持蔬菜脆嫩即可出锅。"
  },
  { 
    name: "蚝油生菜", 
    type: "素",
    ingredients: ["生菜", "蚝油", "蒜"],
    method: "1. 生菜洗净，切成小段。\n2. 蒜切片，热油锅爆香。\n3. 加入生菜快速翻炒。\n4. 最后加入蚝油调味即可。"
  }
]

interface Recipe {
  name: string;
  type: string;
  ingredients: string[];
  method: string;
}

export default function RecipePage() {
  const [recipe, setRecipe] = useState({
    name: '',
    ingredients: '',
    instructions: '',
  });
  const [aiGeneratedRecipe, setAiGeneratedRecipe] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setRecipe(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('提交的菜谱:', recipe);
    // 这里可以添加提交菜谱到后端的逻辑
  };

  const generateAIRecipe = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/ai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          modelKey: 'cloudflare',
          messages: [
            {
              role: 'system',
              content: '你是一个专业的厨师，擅长创造美味的菜谱。',
            },
            {
              role: 'user',
              content: '请生成一个随机的菜谱，包括菜名、原料和烹饪步骤。',
            },
          ],
        }),
      });

      if (!response.ok) {
        throw new Error('AI 请求失败');
      }

      const result = await response.json();
      setAiGeneratedRecipe(result.response);
    } catch (error) {
      console.error('AI 生成菜谱错误:', error);
      setAiGeneratedRecipe('生成菜谱时出错，请稍后再试。');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <h1 className="text-2xl font-bold mb-4 text-center">创建新菜谱</h1>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">菜名</label>
          <input
            type="text"
            id="name"
            name="name"
            value={recipe.name}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        
        <div>
          <label htmlFor="ingredients" className="block text-sm font-medium text-gray-700">原料</label>
          <textarea
            id="ingredients"
            name="ingredients"
            value={recipe.ingredients}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            rows={3}
          />
        </div>
        
        <div>
          <label htmlFor="instructions" className="block text-sm font-medium text-gray-700">烹饪步骤</label>
          <textarea
            id="instructions"
            name="instructions"
            value={recipe.instructions}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            rows={5}
          />
        </div>
        
        <button
          type="submit"
          className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          保存菜谱
        </button>
      </form>

      <div className="mt-8">
        <button 
          onClick={generateAIRecipe} 
          className="w-full px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          disabled={isLoading}
        >
          {isLoading ? '生成中...' : '使用 AI 生成菜谱'}
        </button>
      </div>

      {aiGeneratedRecipe && (
        <div className="mt-4 p-4 bg-gray-100 rounded-md">
          <h2 className="text-lg font-semibold mb-2">AI 生成的菜谱：</h2>
          <pre className="whitespace-pre-wrap text-sm">{aiGeneratedRecipe}</pre>
        </div>
      )}
    </div>
  );
}