# AI Wizard Tool - 改造记录

## 改造目标
原项目：YD4223/aihub（赛博朋克AI工具导航站）
改造为：aiwizardtool.com（AI 编程工具对比站 + MCP 目录）

## 已完成改动

### UI 换肤
- `src/app/globals.css`：补充标准 CSS 变量（--primary, --primary-light, --primary-mid, --accent, --accent-light, --success, --success-light, --warning, --warning-light, --danger, --danger-light, --bg-main, --bg-secondary, --text-primary, --text-secondary, --text-muted, --border）
- 换肤已完成（前次已完成）：--neon-* 颜色全部替换为商业蓝白配色（#185FA5 主蓝、#534AB7 紫色 accent）
- 赛博朋克动画/特效全部已移除或置空（@keyframes glitch/scanline 置空，scanlines/grid-pattern/circuit-pattern 不可见）
- box-shadow 全部替换为柔和阴影（rgba 值基于品牌蓝，无霓虹发光）

### 品牌替换
- `src/components/Footer.tsx`：
  - Logo 从 "AI HUB"（BrainCircuit 图标 + glitch effect 层）→ 简洁方块 + "AI Wizard Tool" 文字
  - 副标题从 "发现全球最新最热的AI工具..." → "Find the best AI coding tools, compare features and prices. Built for vibe coding workflows."
  - 版权行从 "© 2026 AI Hub." → "© 2026 AI Wizard Tool."
- `public/site.webmanifest`：
  - name: "AI Hub - 全球AI工具聚合平台" → "AI Wizard Tool - Discover & Compare AI Coding Tools"
  - short_name: "AI Hub" → "AI Wizard Tool"
  - description: 更新为英文品牌描述
  - background_color: "#0a0a0f"（黑色） → "#FFFFFF"（白色）
  - theme_color: "#0a0a0f" → "#185FA5"（品牌蓝）
- `src/components/Navbar.tsx`：Logo 已是 "AI Wizard Tool"，无需改动
- `src/app/layout.tsx`：title/description 已是 AI Wizard Tool，无需改动
- `src/app/page.tsx`：Hero 标题已是 "Discover & Compare AI Coding Tools"，副标题已正确，无需改动

## 待完成事项

### 必须完成（上线前）
1. 配置 .env 文件（复制 .env.example，填入 Supabase credentials）
2. 运行 `npm run db:generate`（生成 Prisma client）
3. 在 Supabase 创建数据库并运行 schema
4. 导入 15 个 AI 工具数据（tools.ts → SQL）
5. 导入 MCP servers 数据（mcp_servers.json → SQL）
6. 把 compare-template.tsx 放到正确路径：`src/app/compare/[slug]/page.tsx`

### 第一周目标
7. 提交 ProductHunt
8. 提交 20 个导航站（参见外链清单）
9. 按哥飞 SEO 三字经节奏推进

## 技术栈
- Next.js 14 App Router
- Prisma ORM
- Supabase（PostgreSQL）
- Tailwind CSS
- Vercel（部署）
