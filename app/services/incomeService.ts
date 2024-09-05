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
  export async function fetchIncomes(searchTerm?: string): Promise<any[]> {
    const params = new URLSearchParams();
    if (searchTerm) {
      params.append('search', searchTerm);
    }
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