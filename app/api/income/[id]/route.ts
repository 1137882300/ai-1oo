import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/dbConnect';
import { ObjectId } from 'mongodb';
import { DatabaseConfig } from '@/app/config/appConfig';


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
    const db = client.db(DatabaseConfig.DATABASE_NAME); // 确保这是正确的数据库名称
    const income = await db.collection(DatabaseConfig.COLLECTION_NAME).findOne({ _id: new ObjectId(params.id) });
    
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
    const db = client.db(DatabaseConfig.DATABASE_NAME);
    const collection = db.collection(DatabaseConfig.COLLECTION_NAME);

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

// 更新收入记录
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const client = await clientPromise;
    const db = client.db(DatabaseConfig.DATABASE_NAME);
    const collection = db.collection(DatabaseConfig.COLLECTION_NAME);

    const { id } = params;
    const updateData = await request.json();

    // 确保从 updateData 中移除 _id 字段
    const { _id, ...safeUpdateData } = updateData;

    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: '无效的ID' }, { status: 400 });
    }

    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: safeUpdateData }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: '未找到该收入记录' }, { status: 404 });
    }

    return NextResponse.json({ message: '更新成功' });
  } catch (error) {
    console.error('更新收入记录时出错:', error);
    return NextResponse.json({ error: '更新收入记录失败' }, { status: 500 });
  }
}