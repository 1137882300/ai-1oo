import { Income } from "@/types";
// 删除收入记录
export async function deleteIncome(id: string): Promise<void> {
  if (!id) {
    throw new Error('Invalid id');
  }
  const response = await fetch(`/api/income/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('删除失败');
  }
}
  
  // 获取收入列表
  export async function fetchIncomes(
    searchTerm?: string, 
    userId?: string, 
    page: number = 1, 
    pageSize: number = 15
  ): Promise<{ data: any[], total: number }> {
    const params = new URLSearchParams();
    params.append('action', 'list');
    if (searchTerm) {
      params.append('search', searchTerm);
    }
    if (userId) {
      params.append('userId', userId);
    }
    params.append('page', page.toString());
    params.append('pageSize', pageSize.toString());

    const response = await fetch(`/api/income?${params.toString()}`);
    if (!response.ok) {
      throw new Error('获取收入列表失败');
    }
    return response.json();
  }
  
  // 添加新收入
  export async function addIncome(formData: any): Promise<void> {
    const response = await fetch('/api/income', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    if (!response.ok) {
      throw new Error('添加收入失败');
    }
  }

  // 获取收入统计数据
  export async function fetchIncomeStatistics(timeFrame: string, selectedUser: string) {
    try {
      const response = await fetch(`/api/income?statistics=true&timeFrame=${timeFrame}&selectedUser=${selectedUser}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log('Fetched data:', data);
      return data;
    } catch (error) {
      console.error('Error fetching income statistics:', error);
      throw new Error('获取收入统计数据失败');
    }
  }

  // 获取收入详情
  export async function fetchIncomeById(id: string): Promise<Income> {
    const response = await fetch(`/api/income/${id}`);
    if (!response.ok) {
      throw new Error('获取收入详情失败');
    }
    return response.json();
  }

  // 更新收入
  export async function updateIncome(id: string, data: Partial<Income>): Promise<void> {
    // 确保从 data 中移除 _id 字段
    const { _id, ...updateData } = data;
    
    const response = await fetch(`/api/income/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateData),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || '更新收入失败');
    }
  }