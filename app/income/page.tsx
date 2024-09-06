'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { fetchIncomes, deleteIncome, addIncome, fetchIncomeById, updateIncome } from '../services/incomeService';
import Link from 'next/link';
import { Income , columnDisplayNames} from "@/types";
import { exportIncomesToWord } from '@/app/services/exportToWord';


interface User {
  id: string;
  name: string;
}


// 静态用户列表
const staticUsers: User[] = [
  { id: '1', name: '小黑' },
  { id: '2', name: '小螃蟹' },
  { id: '3', name: '测试' }
];

export default function IncomePage() {
  const [incomes, setIncomes] = useState<Income[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUserId, setSelectedUserId] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<Partial<Income>>({});
  const [selectedIncome, setSelectedIncome] = useState<Income | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [editingIncomeId, setEditingIncomeId] = useState<string | null>(null);
  const pageSize = 3;

  const handleSearch = useCallback(async (page: number = 1) => {
    setIsLoading(true);
    try {
      const { data, total } = await fetchIncomes(searchTerm, selectedUserId, page, pageSize);
      setIncomes(data);
      setTotalPages(Math.ceil(total / pageSize));
      setCurrentPage(page);
    } catch (error) {
      console.error('获取收入列表时出错:', error);
    } finally {
      setIsLoading(false);
    }
  }, [searchTerm, selectedUserId, pageSize]);

  const handleReset = () => {
    setSearchTerm('');
    setSelectedUserId('');
    handleSearch(1);
  };

  //用于动态生成表格的列头或表单字段。
  //useCallback 是一个 React 钩子，用于优化性能。它返回一个记忆化的回调函数。
  const getIncomeKeys = useCallback(() => {
    //获取 columnDisplayNames 对象的所有键。
    return Object.keys(columnDisplayNames);
    //空数组 [] 作为 useCallback 的依赖项列表，表示这个函数只会在组件首次渲染时创建，之后不会重新创建。
  }, []);

  const handleDeleteIncome = async (id: string) => {
    if (!id) {
      console.error('Invalid income id');
      return;
    }
    if (confirm('确定要删除这条记录吗?')) {
      try {
        await deleteIncome(id);
        await handleSearch();
      } catch (error) {
        console.error('删除收入时出错:', error);
        // 这里可以添加错误处理逻辑，比如显示错误消息
      }
    }
  };

  //这个函数 handleInputChange 用于处理表单输入的变化 
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    //从事件目标中提取 name 和 value 属性。
    const { name, value } = e.target;
    //保留之前的所有表单数据（...prev）
    //更新变化的字段（[name]: value）
    setFormData(prev => ({ ...prev, [name]: value }));
    console.log(`Field ${name} updated to ${value}`);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingIncomeId) {
        await updateIncome(editingIncomeId, formData);
      } else {
        await addIncome(formData);
      }
      await handleSearch(currentPage);
      setIsModalOpen(false);
      setFormData({});
      setEditingIncomeId(null);
    } catch (error) {
      console.error('保存收入时出错:', error);
      // 这里可以添加错误处理逻辑，比如显示错误消息
    }
  };

  // 格式化显示值的函数
  const formatValue = (value: any) => {
    if (typeof value === 'number') return value.toFixed(2);
    if (value === null || value === undefined) return '-';
    return value.toString();
  };

  const handleViewDetails = async (id: string) => {
    try {
      const response = await fetch(`/api/income/${id}`);
      if (!response.ok) throw new Error('获取数据失败');
      const data = await response.json();
      setSelectedIncome(data);
      setIsDetailModalOpen(true);
    } catch (error) {
      console.error('获取收入详情时出错:', error);
      // 这里可以添加错误处理逻辑��比如显示错误消息
    }
  };

  const handleEditIncome = async (id: string) => {
    try {
      const incomeToEdit = await fetchIncomeById(id);
      setFormData(incomeToEdit);
      setIsModalOpen(true);
      setEditingIncomeId(id);
    } catch (error) {
      console.error('获取收入详情时出错:', error);
      // 这里可以添加错误处理逻辑，比如显示错误消息
    }
  };

  useEffect(() => {
    handleSearch(1);
  }, [handleSearch]);

  const handleExportToWord = useCallback(async () => {
    try {
      await exportIncomesToWord(incomes);
    } catch (error) {
      console.error('导出Word文档时出错:', error);
      // 这里可以添加一些用户反馈，比如显示一个错误提示
    }
  }, [incomes]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">收入列表</h1>
      <div className="flex justify-between mb-4">
        <div className="flex space-x-2">
          <input
            type="text"
            placeholder="搜索..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border p-2 rounded"
          />
          <select
            value={selectedUserId}
            onChange={(e) => setSelectedUserId(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="">所有用户</option>
            {staticUsers.map(user => (
              <option key={user.id} value={user.id}>{user.name}</option>
            ))}
          </select>
          <button
            onClick={handleReset}
            className="bg-gray-500 text-white px-4 py-2 rounded transition duration-150 ease-in-out active:bg-gray-600 active:transform active:scale-95"
          >
            重置
          </button>
          <button
            onClick={() => handleSearch(currentPage)}
            className="bg-green-500 text-white px-4 py-2 rounded transition duration-150 ease-in-out active:bg-green-600 active:transform active:scale-95"
          >
            查询
          </button>
        </div>
        <div className="flex space-x-2">
          <Link href="/income/statistics" passHref>
            <button className="bg-purple-500 text-white px-4 py-2 rounded transition duration-150 ease-in-out hover:bg-purple-600 active:bg-purple-700 active:transform active:scale-95">
              统计
            </button>
          </Link>
          <button
          onClick={handleExportToWord}
          className="bg-green-500 text-white px-4 py-2 rounded transition duration-150 ease-in-out active:bg-green-600 active:transform active:scale-95"          >
            导出为Word
          </button>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded transition duration-150 ease-in-out hover:bg-blue-600 active:bg-blue-700 active:transform active:scale-95 w-24 h-full"
          >
            添加数据
          </button>
        </div>
      </div>
      {isLoading ? (
        <div className="text-center">加载中...</div>
      ) : (
        <>
          <table className="w-full border-collapse border">
            <thead>
              <tr className="bg-gray-200">
                {getIncomeKeys().map(key => (
                  <th key={key} className="border p-2">
                    {columnDisplayNames[key]}
                  </th>
                ))}
                <th className="border p-2">操作</th>
              </tr>
            </thead>
            <tbody>
              {incomes.map(income => (
                <tr key={income._id}>
                  {getIncomeKeys().map(key => (
                    <td key={key} className="border p-2">
                      {formatValue(income[key])}
                    </td>
                  ))}
                  <td className="border p-2">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleViewDetails(income._id)}
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-2 rounded text-sm"
                      >
                        查看
                      </button>
                      <button
                        onClick={() => handleEditIncome(income._id)}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-1 px-2 rounded text-sm"
                      >
                        编辑
                      </button>
                      <button
                        onClick={() => handleDeleteIncome(income._id)}
                        className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded text-sm"
                      >
                        删除
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-4 flex justify-center items-center space-x-2">
            <button
              onClick={() => handleSearch(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
            >
              上一页
            </button>
            <span className="text-gray-700">
              第 {currentPage} 页 / 共 {totalPages} 页
            </span>
            <button
              onClick={() => handleSearch(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
            >
              下一页
            </button>
          </div>
        </>
      )}

      {/* 详情弹窗 */}
      {isDetailModalOpen && selectedIncome && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white p-8 rounded-lg w-full sm:w-4/5 md:w-3/4 lg:w-2/3 xl:w-1/2 max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-6 text-center">收入详情</h2>
            <pre className="whitespace-pre-wrap">
              {JSON.stringify(selectedIncome, null, 2)}
            </pre>
            <div className="flex justify-end mt-6">
              <button
                onClick={() => setIsDetailModalOpen(false)}
                className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-150 ease-in-out"
              >
                关闭
              </button>
            </div>
          </div>
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white p-8 rounded-lg w-full sm:w-4/5 md:w-3/4 lg:w-2/3 xl:w-1/2 max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-6 text-center">添加新收入</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              {getIncomeKeys().map(key => {
                if (key === '_id') return null; // 排除 _id 字段
                return (
                  <div key={key} className="mb-4">
                    <label htmlFor={key} className="block mb-2 font-semibold text-gray-700">
                      {columnDisplayNames[key]}
                    </label>
                    {key === 'userId' ? (
                      <select
                        id={key}
                        name={key}
                        value={formData[key] || ''}
                        onChange={handleInputChange}
                        className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      >
                        <option value="">请选择用户</option>
                        {staticUsers.map(user => (
                          <option key={user.id} value={user.id}>
                            {user.name}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type={key === 'date' ? 'date' : key === 'amount' || key === 'bonus' || key === 'personalIncomeTax' || key === 'socialInsurance' ? 'number' : 'text'}
                        id={key}
                        name={key}
                        value={formData[key] || ''}
                        onChange={handleInputChange}
                        className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required={key !== 'note'}
                        step={key === 'amount' || key === 'bonus' || key === 'personalIncomeTax' || key === 'socialInsurance' ? '0.01' : undefined}
                      />
                    )}
                  </div>
                );
              })}
              <div className="flex justify-end mt-6 space-x-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-2 bg-gray-300 rounded hover:bg-gray-400 transition duration-150 ease-in-out"
                >
                  取消
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-150 ease-in-out"
                >
                  保存
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
