# CLAUDE.md

本文件指导 Claude Code 在本仓库中工作。

## 项目定位

「小丑牌 Web」——AI 全流程开发课程的教学示例项目。一个基于扑克牌型的单机数值小游戏。当前为 **Vue 3 + Vite** 实现，架构为后续用 **Tauri** 打包跨端 App 做准备。重点是流程教学（PRD → 设计 → 实现 → 验收），代码以易读、可在课堂讲解为优先。

## 目录约定

- `src/game/engine.js` —— 纯游戏引擎（牌堆 / 洗牌 / 牌型识别 / 计分），不依赖 Vue / DOM，便于测试和移植
- `src/composables/useGame.js` —— 全局响应式状态管理，组件经 `useGame()` 共享同一份状态
- `src/components/` —— UI 组件：PokerCard / GameHud / PlayZone / HandZone / ActionBar / ResultOverlay
- `src/App.vue` —— 根组件，组合各区域 + 计分飘字 + 初始化
- `src/styles/global.css` —— 全局样式与 Design Tokens（CSS 变量）
- `legacy/index.html` —— V1.0.0 原始单文件版本，仅存档对照，不再维护
- `docs/PRD.html` —— 产品需求文档，是功能范围的唯一权威来源（V1.0.0 范围以此为准）
- `docs/AI Coding 全流程实战.html` —— 教学讲义，一般不改动
- `design/DESIGN.html` —— 设计规范，配色 / 字体 / 间距 / 卡牌样式以此为准
- `claude-kit/agents/` —— Claude Code 子代理角色定义（product-manager / ui-designer / fullstack-engineer / qa-engineer）
- `claude-kit/slash/` —— Claude Code 自定义 slash 命令源文件
- `.claude/` —— 本地 Claude Code 配置

## 常用命令

```bash
npm install        # 安装依赖（首次）
npm run dev        # 本地开发
npm run build      # 构建到 dist/
npm run preview    # 预览构建产物
```

## 开发约定

- 改游戏逻辑或样式前，先对照 `docs/PRD.html` / `design/DESIGN.html`，不要偏离已定义的范围和视觉规范
- 数值规则（牌型基础分、倍数、点数）只在 `src/game/engine.js` 维护，严格按 PRD 表格，改动需同步文档
- 纯逻辑放 `engine.js`（无框架依赖），响应式状态放 `useGame.js`，UI 只在组件里——保持这一分层，利于将来接 Tauri
- 视觉迁移自原单文件版，组件样式用 `<style scoped>`，公共 token 走 `global.css` 的 CSS 变量
- 这是教学代码，命名和注释保持清晰，便于课堂逐行讲解
- 不改 `legacy/` 下的存档文件
