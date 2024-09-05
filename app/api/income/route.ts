import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/dbConnect';
import { ObjectId } from 'mongodb';

// app/api/income/route.ts 处理 /api/income 的请求（如 GET 获取所有收入，POST 创建新收入）。
// 获取所有收入记录
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const client = await clientPromise;
    const db = client.db("robus_database");
    const collection = db.collection("robus_collection");

    // 构建查询条件
    let query = {};
    if (searchParams.has('startDate') && searchParams.has('endDate')) {
      query = {
        date: {
          $gte: new Date(searchParams.get('startDate')!),
          $lte: new Date(searchParams.get('endDate')!)
        }
      };
    }

    const incomes = await collection.find(query).toArray();
    return NextResponse.json(incomes.map(income => ({
      ...income,
      id: income._id.toString() // 确保前端收到的是字符串形式的id
    })));
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: '获取收入记录失败' }, { status: 500 });
  }
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
