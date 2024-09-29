interface AIModelConfig {
  url: string;
  apiToken: string;
  model: string;
}

const aiModels: { [key: string]: AIModelConfig } = {
  cloudflare: {
    url: process.env.API_BASE || '',
    apiToken: process.env.API_TOKEN || '',
    model: process.env.MODEL_NAME || '',
  },
  // 可以添加其他模型的配置
};

export interface AIMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export async function runAIModel(modelKey: string, messages: AIMessage[]) {
  const config = aiModels[modelKey];
  if (!config) {
    throw new Error(`未找到模型配置: ${modelKey}`);
  }

  const response = await fetch(`${config.url}/${config.model}`, {
    headers: { 
      'Authorization': `Bearer ${config.apiToken}`,
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify({ messages }),
  });

  if (!response.ok) {
    throw new Error(`AI 模型请求失败: ${response.statusText}`);
  }

  return await response.json();
}