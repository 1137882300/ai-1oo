import { Category , NewlyAddedItem} from '../types';

export const categories: Category[] = [
  {
    title: "Vector Databases",
    icon: "🗄️",
    items: [
      { name: "Pinecone", link: "https://www.pinecone.io/" },
      { name: "MongoDB Atlas", link: "https://www.mongodb.com/atlas/database" },
      { name: "Milvus", link: "https://milvus.io/" },
      { name: "Chroma", link: "https://www.trychroma.com/" },
      { name: "Weaviate", link: "https://weaviate.io/" },
      { name: "DeepLake", link: "https://www.activeloop.ai/" },
      { name: "Qdrant", link: "https://qdrant.tech/" },
      { name: "Elasticsearch", link: "https://www.elastic.co/" },
      { name: "Pgvector", link: "https://github.com/pgvector/pgvector" },
      { name: "Faiss", link: "https://github.com/facebookresearch/faiss" },
      { name: "ClickHouse", link: "https://clickhouse.com/" },
      { name: "Cassandra", link: "https://cassandra.apache.org/" },
    ]
  },
  {
    title: "AI Search Engines",
    icon: "🔍",
    items: [
      { name: "Perplexity", link: "https://www.perplexity.ai/" },
      { name: "Felo", link: "https://felo.ai/" },
      { name: "Devv AI", link: "https://devv.ai/" },
      { name: "Phind", link: "https://www.phind.com/" },
      { name: "超能文献", link: "https://www.chaonengwenxian.cn/" },
      { name: "秘塔", link: "https://metaso.cn/" },
    ]
  },
  {
    title: "Chatbots",
    icon: "🤖",
    items: [
      { name: "ChatGPT", link: "https://chat.openai.com/" },
      { name: "Microsoft Copilot", link: "https://copilot.microsoft.com/" },
      { name: "Claude", link: "https://www.anthropic.com/" },
      { name: "Bard", link: "https://bard.google.com/" },
      { name: "HuggingChat", link: "https://huggingface.co/chat/" },
      { name: "SpicyChat", link: "https://spicychat.ai/", isNew: true },
      { name: "Candy AI", link: "https://candy.ai/", isNew: true },
      { name: "CrushOn.AI", link: "https://crushon.ai/", isNew: true },
      { name: "character.ai", link: "https://character.ai/", isNew: true },
      { name: "JanitorAI", link: "https://janitorai.com/", isNew: true },
      { name: "Poe", link: "https://poe.com/", isNew: true },
      { name: "QuillBot", link: "https://quillbot.com/", isNew: true },
      { name: "通义千问", link: "https://tongyi.aliyun.com/" },
      { name: "文心一言", link: "https://yiyan.baidu.com/" },
      { name: "Kimi", link: "https://kimi.moonshot.cn/" },
      { name: "腾讯混元", link: "https://hunyuan.tencent.com/" },
      { name: "智谱清言", link: "https://chatglm.cn/" },
      { name: "海螺AI", link: "https://www.hailuoai.com/" },
    ]
  },
];

//NewlyAdded 
export const newlyAddedItems: NewlyAddedItem[] = [ 
    { name: "LlamaIndex", category: "LLM Tools", link: "https://www.llamaindex.ai/" },
    { name: "SpicyChat", category: "Chatbots", link: "https://spicychat.ai/" },
    { name: "Candy AI", category: "Chatbots", link: "https://candy.ai/" },
    { name: "CrushOn.AI", category: "Chatbots", link: "https://crushon.ai/" },
    { name: "character.ai", category: "Chatbots", link: "https://character.ai/" },
    { name: "JanitorAI", category: "Chatbots", link: "https://janitorai.com/" },
    // ... 其他新增项目
  ];