'use client';

import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { fetchIncomeStatistics } from '@/app/services/incomeService';

interface StatisticsData {
  name: string;
  value: number;
}

const StatisticsPage: React.FC = () => {
  const [data, setData] = useState<StatisticsData[]>([]);
  const [timeFrame, setTimeFrame] = useState('month');
  const [selectedUser, setSelectedUser] = useState('all');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const statisticsData = await fetchIncomeStatistics(timeFrame, selectedUser);
        setData(statisticsData);
      } catch (error) {
        console.error('获取统计数据时出错:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, [timeFrame, selectedUser]);

  if (isLoading) {
    return <div>加载中...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">收入统计</h1>
      
      <div className="mb-4 flex justify-between">
        <div>
          <select 
            value={timeFrame} 
            onChange={(e) => setTimeFrame(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="month">按月</option>
            <option value="year">按年</option>
          </select>
        </div>
        <div>
          <select 
            value={selectedUser} 
            onChange={(e) => setSelectedUser(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="all">所有用户</option>
            {/* 这里可以添加更多用户选项 */}
          </select>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="value" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StatisticsPage;
