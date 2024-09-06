import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/dbConnect';
import { ObjectId ,Collection} from 'mongodb';

// app/api/income/route.ts 处理 /api/income 的请求（如 GET 获取所有收入，POST 创建新收入）。
// 获取所有收入记录
export async function GET(request: NextRequest) {
  console.log('GET 函数被调用', new Date().toISOString());
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');

    const client = await clientPromise;
    const db = client.db("robus_database");
    const collection = db.collection("robus_collection");

    switch (action) {
      case 'statistics':
        return await handleStatistics(searchParams, collection);
      case 'list':
        return await handleList(searchParams, collection);
      case 'detail':
        return await handleDetail(searchParams, collection);
      default:
        return NextResponse.json({ error: '无效的操作' }, { status: 400 });
    }
  } catch (error: unknown) {
    console.error('GET /api/income 错误:', error);
    return NextResponse.json({ error: '获取数据失败', details: (error as Error).message }, { status: 500 });
  }
}

async function handleStatistics(searchParams: URLSearchParams, collection: Collection) {
  const timeFrame = searchParams.get('timeFrame');
  const selectedUser = searchParams.get('selectedUser');
  // 实现统计逻辑
  const statistics = {
    // 在这里添加您的统计数据
    timeFrame,
    selectedUser,
    // 其他统计信息...
  };
  return NextResponse.json(statistics);
}

async function handleList(searchParams: URLSearchParams, collection: Collection) {
  const searchTerm = searchParams.get('search');
  const userId = searchParams.get('userId');

  let query: any = {};
  if (searchTerm) {
    query.$or = [
      { note: { $regex: searchTerm, $options: 'i' } },
      { userId: { $regex: searchTerm, $options: 'i' } }
    ];
  }
  if (userId) {
    query.userId = userId;
  }

  const list = await collection.find(query).toArray();
  return NextResponse.json(list);
}

async function handleDetail(searchParams: URLSearchParams, collection: Collection) {
  const id = searchParams.get('id');
  if (!id) {
    return NextResponse.json({ error: '缺少ID参数' }, { status: 400 });
  }
  
  const detail = await collection.findOne({ _id: new ObjectId(id) });
  
  if (!detail) {
    return NextResponse.json({ error: '未找到记录' }, { status: 404 });
  }
  
  return NextResponse.json(detail);
}

// 创建新的收入记录
export async function POST(request: Request) {
  try {
    const client = await clientPromise;
    const db = client.db("robus_database");
    const collection = db.collection("robus_collection");

    const body = await request.json();
    const result = await collection.insertOne(body);

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: '创建收入记录失败' }, { status: 500 });
  }
}

// 更新收入记录
export async function PUT(request: Request) {
  try {
    const client = await clientPromise;
    const db = client.db("robus_database");
    const collection = db.collection("robus_collection");

    const body = await request.json();
    const { id, ...updateData } = body;

    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: '未找到该收入记录' }, { status: 404 });
    }

    return NextResponse.json({ message: '更新成功' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: '更新收入记录失败' }, { status: 500 });
  }
}

// 删除收入记录
export async function DELETE(request: Request) {
  try {
    const client = await clientPromise;
    const db = client.db("robus_database");
    const collection = db.collection("robus_collection");

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: '缺少ID参数' }, { status: 400 });
    }

    const result = await collection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: '未找到该收入记录' }, { status: 404 });
    }

    return NextResponse.json({ message: '删除成功' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: '删除收入记录失败' }, { status: 500 });
  }
}
