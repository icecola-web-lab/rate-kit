# rate-kit

`rate-kit` 是一个围绕自由职业与顾问报价场景构建的多语言 Web 工具站。

当前技术栈：

- `Next.js 16`
- `React 19`
- `Tailwind CSS 4`
- `next-intl 4`
- `shadcn/ui` 风格基础组件

支持语言：

- `en`
- `ja`
- `zh-Hant`
- `zh-Hans`

本地启动：

```bash
pnpm install
cp .env.example .env.local
pnpm dev
```

Node：请使用当前稳定版。

环境变量：

- `NEXT_PUBLIC_SITE_URL`：生产站点地址，用于 canonical、sitemap、Open Graph。
- `NEXT_PUBLIC_PLAUSIBLE_DOMAIN`：可选，接入 `Plausible` 时填写域名。

部署建议：

- 首发优先部署到 `Vercel`。
- 域名就绪后，把 `NEXT_PUBLIC_SITE_URL` 改成正式域名。
- 上线前执行 `pnpm typecheck && pnpm lint && pnpm build`。

当前内容策略：

- 默认语言：`en`、`ja`、`zh-Hant`、`zh-Hans`
- 首发模式：免费 SEO 工具站，不依赖自建后端
- 核心场景：小时费率、日费率、月度 retainer 报价
- 后续可加：提案模板、报价模板、顾问定价数字产品、相关 SaaS 联盟分发
