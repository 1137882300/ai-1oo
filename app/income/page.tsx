'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Income {
  id: string;
  amount: number;
  description: string | null; // 添加 null 作为可能的类型
  date: string;
}

export default function IncomePage() {
  const [incomes, setIncomes] = useState<Income[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  useEffect(() => {
    fetchIncomes();
  }, []);

  const fetchIncomes = async () => {
    try {
      // 构建查询参数
      const params = new URLSearchParams();
      if (searchTerm) {
        params.append('search', searchTerm);
      }
      // 可以添加其他查询参数，比如日期范围等
      // if (startDate) params.append('startDate', startDate);
      // if (endDate) params.append('endDate', endDate);

      // 发送请求
      const response = await fetch(`/api/income?${params.toString()}`);
      if (!response.ok) {
        throw new Error('获取收入列表失败');
      }
      const data = await response.json();
      setIncomes(data);
    } catch (error) {
      console.error('获取收入列表时出错:', error);
      // 可以在这里添加错误处理逻辑，比如显示错误消息
    } finally {
      // 可以在这里添加加载状态的处理
      // setIsLoading(false);
    }
  };

  const filteredIncomes = incomes.filter(income =>
    income.description
      ? income.description.toLowerCase().includes(searchTerm.toLowerCase())
      : false
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">收入列表</h1>
      <div className="flex justify-between mb-4">
        <div className="flex">
          <input
            type="text"
            placeholder="搜索收入..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border p-2 rounded-l"
          />
          <button
            onClick={fetchIncomes}
            className="bg-green-500 text-white px-4 py-2 rounded-r"
          >
            查询
          </button>
        </div>
        <Link href="/income/add" className="bg-blue-500 text-white px-4 py-2 rounded">
          添加收入
        </Link>
      </div>
      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">日期</th>
            <th className="border p-2">描述</th>
            <th className="border p-2">金额</th>
            <th className="border p-2">操作</th>
          </tr>
        </thead>
        <tbody>
          {filteredIncomes.map(income => (
            <tr key={income.id}>
              <td className="border p-2">{income.date}</td>
              <td className="border p-2">{income.description}</td>
              <td className="border p-2">{income.amount}</td>
              <td className="border p-2">
                <Link href={`/income/${income.id}`} className="text-blue-500">
                  查看详情
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
