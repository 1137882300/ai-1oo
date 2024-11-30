This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run build
npm run dev
# or
yarn dev
# or    
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## 框架
tailwindcss: https://tailwindcss.com/docs/size
nest.js: https://nestjs.com/docs/
react: https://react.dev/learn/start-a-new-react-project#nextjs-pages-router

```
 1229  git remote add origin https://github.com/1137882300/ai-1oo.git
 1230  git remote -v
 1231  git push origin master --force
 1232  git init
 1233  git commit -m 'init'
 1234  git push
 1235  git push --set-upstream origin master
 1236  git remote add origin git@github.com:1137882300/ai-1oo.git
 1237  git remote set-url origin git@github.com:1137882300/ai-1oo.git
 1238  git push --set-upstream origin master
 1239  git push origin master --force
```
```
在Next.js应用中，从启动到呈现页面的大致流程如下：

首先执行 next.config.mjs 文件，加载Next.js的配置。
然后读取 .env 文件(如果存在)，加载环境变量。在这个项目中是 next-env.d.ts。
执行 package.json 中定义的启动脚本，通常是 next dev 或 next start。
Next.js初始化应用，加载全局样式 globals.css。
路由系统开始工作，根据URL确定要渲染的页面。
执行 layout.tsx 文件，它定义了应用的整体布局结构。
根据路由加载并执行对应的 page.tsx 文件，这是实际页面内容。
如果页面中使用了自定义组件（如 Category.tsx），这些组件会被加载和渲染。
如果定义了数据获取函数（如getStaticProps或getServerSideProps），它们会在这个阶段执行。
最后，完整的页面被渲染并发送到浏览器。
客户端JavaScript开始执行，使页面具有交互性。
在整个过程中，tailwind.config.ts 会被用于处理样式，tsconfig.json 用于TypeScript配置，.eslintrc.json 用于代码检查。

favicon.ico 和 public 目录中的静态资源在需要时会被服务。
```
安装插件 GitLens

https://github.com/airobus/ai-1oo.git