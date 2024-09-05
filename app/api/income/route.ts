import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/dbConnect';
import { ObjectId } from 'mongodb';

// app/api/income/route.ts 处理 /api/income 的请求（如 GET 获取所有收入，POST 创建新收入）。
// 获取所有收入记录
export async function GET(request: NextRequest) {
  console.log('GET function called', new Date().toISOString());
  try {
    const { searchParams } = new URL(request.url);
    const isStatistics = searchParams.get('statistics') === 'true';
    const client = await clientPromise;
    const db = client.db("robus_database");
    const collection = db.collection("robus_collection");

    if (isStatistics) {
      const timeFrame = searchParams.get('timeFrame');
      const selectedUser = searchParams.get('selectedUser');

      console.log('Query params:', { timeFrame, selectedUser });

      let query: any = {};
      if (selectedUser && selectedUser !== 'all') {
        query.userId = selectedUser;
      }

      if (timeFrame === 'week') {
        query.date = { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] };
      } else if (timeFrame === 'month') {
        query.date = { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] };
      } else if (timeFrame === 'year') {
        query.date = { $gte: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] };
      }

      console.log('MongoDB query:', JSON.stringify(query));

      const statistics = await collection.aggregate([
        { $match: query },
        { $group: {
          _id: "$date",
          totalAmount: { $sum: "$amount" },
          totalBonus: { $sum: "$bonus" },
          totalTax: { $sum: "$personalIncomeTax" },
          totalInsurance: { $sum: "$socialInsurance" }
        }},
        { $sort: { _id: 1 } }
      ]).toArray();

      console.log('Statistics result:', JSON.stringify(statistics));

      return NextResponse.json(statistics);
    }

    // 处理其他 GET 请求（如获取收入列表）
    // ...

  } catch (error: unknown) {
    console.error('Error in GET /api/income:', error);
    return NextResponse.json({ error: '获取数据失败', details: (error as Error).message }, { status: 500 });
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
