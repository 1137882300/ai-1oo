"use client"

import { useState } from 'react'

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
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [customRecipe, setCustomRecipe] = useState("")
  const [meatDishCount, setMeatDishCount] = useState(1)
  const [vegDishCount, setVegDishCount] = useState(1)

  const generateRandomRecipes = () => {
    const meatDishes = recipeDatabase.filter(recipe => recipe.type === "荤")
    const vegDishes = recipeDatabase.filter(recipe => recipe.type === "素")
    
    const selectedMeatDishes = getRandomRecipes(meatDishes, meatDishCount)
    const selectedVegDishes = getRandomRecipes(vegDishes, vegDishCount)
    
    setRecipes([...selectedMeatDishes, ...selectedVegDishes])
  }

  const getRandomRecipes = (dishes: Recipe[], count: number) => {
    const shuffled = [...dishes].sort(() => 0.5 - Math.random())
    return shuffled.slice(0, count)
  }

  const handleCustomRecipe = (e: React.FormEvent) => {
    e.preventDefault()
    setRecipes([...recipes, { name: customRecipe, ingredients: ["请自行添加所需食材"], method: "请自行添加烹饪方法", type: "自定义" }])
    setCustomRecipe("")
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">增强版随机菜谱生成器</h1>
      
      <div className="grid gap-4 mb-4">
        <div className="flex gap-2">
          <label htmlFor="meatCount" className="flex items-center">荤菜数量:</label>
          <input 
            id="meatCount"
            type="number" 
            min="0"
            value={meatDishCount} 
            onChange={(e) => setMeatDishCount(parseInt(e.target.value))}
            className="w-20 border rounded px-2 py-1"
          />
          <label htmlFor="vegCount" className="flex items-center">素菜数量:</label>
          <input 
            id="vegCount"
            type="number" 
            min="0"
            value={vegDishCount} 
            onChange={(e) => setVegDishCount(parseInt(e.target.value))}
            className="w-20 border rounded px-2 py-1"
          />
          <button onClick={generateRandomRecipes} className="bg-blue-500 text-white px-4 py-2 rounded">随机生成菜谱</button>
        </div>
        
        <form onSubmit={handleCustomRecipe} className="flex gap-2">
          <input 
            type="text" 
            value={customRecipe} 
            onChange={(e) => setCustomRecipe(e.target.value)}
            placeholder="输入自定义菜谱名称"
            className="flex-grow border rounded px-2 py-1"
          />
          <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">添加自定义菜谱</button>
        </form>
      </div>

      {recipes.map((recipe, index) => (
        <div key={index} className="mb-4 border rounded p-4">
          <h2 className="text-xl font-bold">{recipe.name} ({recipe.type})</h2>
          <div>
            <h3 className="font-bold mt-2">所需食材</h3>
            <ul className="list-disc list-inside">
              {recipe.ingredients.map((ingredient, idx) => (
                <li key={idx}>{ingredient}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-bold mt-2">详细做法</h3>
            <p className="whitespace-pre-line">{recipe.method}</p>
          </div>
        </div>
      ))}
    </div>
  )
}