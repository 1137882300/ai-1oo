"use client";

import React, { useState } from 'react';
import Category from './components/Category';

export default function Home() {
    const [categories, setCategories] = useState([
        {
            title: '🤖 Chatbots',
            items: [
                { name: 'ChatGPT', link: 'https://chat.openai.com/' },
                { name: 'Gemini', link: 'https://gemini.google.com/' },
                { name: '通义千问', link: 'https://tongyi.aliyun.com/qianwen/' },
                { name: '腾讯元宝', link: 'https://yuanbao.tencent.com/' },
                { name: 'Claude', link: 'https://claude.ai/' },
                { name: 'HuggingChat', link: 'https://huggingface.co/chat/' },
                { name: '文心一言', link: 'https://yiyan.baidu.com/' },
                { name: 'Kimi', link: '/kimi' }
            ]
        },
        {
            title: '🛠️ LLM App Development Frameworks',
            items: [
                { name: 'LangChain', link: 'https://www.langchain.com/' },
                { name: 'Llama Index', link: 'https://www.llamaindex.ai/' }
            ]
        },
        {
            title: '💻 Hosting Local Models',
            items: [
                { name: 'Ollama', link: 'https://ollama.com/' },
                { name: 'vLLM', link: 'https://vllm.ai/' },
                { name: 'LM Studio', link: 'https://lmstudio.ai/' }
            ]
        },
        {
            title: '📚 LLM App Development Platforms',
            items: [
                { name: 'Dify', link: 'https://dify.ai/' },
                { name: 'AnythingLLM', link: 'https://anythingllm.com/' },
                { name: 'MaxKB', link: 'https://github.com/1Panel-dev/MaxKB' },
                { name: 'Coze', link: 'https://www.coze.com/' },
            ]
        }
    ]);

    return (
        <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold text-center my-8">AI-1oo</h1>
            <p className="text-xl text-center mb-8">Keep discovering the best AI products and projects</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {categories.map((category, index) => (
                    <Category key={index} title={category.title} items={category.items} />
                ))}
            </div>
        </div>
    );
}