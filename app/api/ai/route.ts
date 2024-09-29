import { NextRequest, NextResponse } from 'next/server';
import { runAIModel, AIMessage } from '@/app/lib/ai-models';

export async function POST(request: NextRequest) {
  try {
    const { modelKey, messages } = await request.json();

    if (!modelKey || !Array.isArray(messages)) {
      return NextResponse.json({ error: '无效的请求参数' }, { status: 400 });
    }

    const result = await runAIModel(modelKey, messages as AIMessage[]);
    return NextResponse.json(result);
  } catch (error) {
    console.error('AI 处理错误:', error);
    return NextResponse.json({ error: '处理请求时出错' }, { status: 500 });
  }
}