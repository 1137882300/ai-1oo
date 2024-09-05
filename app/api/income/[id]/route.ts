import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/dbConnect';
import { ObjectId } from 'mongodb';

// 添加 GET 方法处理
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    console.log('请求的ID:', params.id);
    
    if (!ObjectId.isValid(params.id)) {
      console.log('无效的 ObjectId');
      return NextResponse.json({ error: '无效的 ID 格式' }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("robus_database"); // 确保这是正确的数据库名称
    const income = await db.collection('robus_collection').findOne({ _id: new ObjectId(params.id) });
    
    console.log('查询结果:', income);

    if (!income) {
      console.log('未找到收入记录');
      return NextResponse.json({ error: '未找到收入记录' }, { status: 404 });
    }

    return NextResponse.json(income);
  } catch (error) {
    console.error('获取收入详情时出错:', error);
    return NextResponse.json({ error: '获取收入详情失败' }, { status: 500 });
  }
}

// 保留现有的 DELETE 方法
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  if (!id || !ObjectId.isValid(id)) {
    return NextResponse.json({ error: '无效的ID' }, { status: 400 });
  }

  try {
    const client = await clientPromise;
    const db = client.db("robus_database");
    const collection = db.collection("robus_collection");

    const result = await collection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: '未找到要删除的记录' }, { status: 404 });
    }

    return NextResponse.json({ message: '删除成功' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: '删除记录失败' }, { status: 500 });
  }
}