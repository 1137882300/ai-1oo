"use client";

import React, { useState } from 'react';
import Category from './components/Category';

export default function Home() {
    const [categories, setCategories] = useState([
        {
            title: '🤖 Chatbots',
            items: ['ChatGPT', 'Bard', '通义千问', '腾讯元宝', 'Claude', 'HuggingChat', '文心一言']
        },
        {
            title: '🛠️ LLM App Development Frameworks',
            items: ['LangChain', 'Llama Index']
        },
        {
            title: '💻 Hosting Local Models',
            items: ['Ollama', 'vLLM', 'LM Studio']
        },
        {
            title: '📚 LLM App Development Platforms',
            items: ['Dify', 'AnythingLLM', 'MaxKB', 'Coze', 'ChatOllama']
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