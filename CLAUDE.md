# CLAUDE.md

本文件指导 Claude Code 在本仓库中工作。

## 项目定位

「小丑牌 Web」——AI 全流程开发课程的教学示例项目。一个基于扑克牌型的单机数值小游戏，纯前端单文件实现。重点是流程教学（PRD → 设计 → 实现 → 验收），代码以易读、可在课堂讲解为优先，不引入构建工具和框架。

## 目录约定

- `index.html` —— 游戏本体，HTML/CSS/JS 全部内联在单文件中，直接浏览器打开运行
- `PRD.html` —— 产品需求文档，是功能范围的唯一权威来源（V1.0.0 范围以此为准）
- `DESIGN.html` —— 设计规范，配色 / 字体 / 间距 / 卡牌样式以此为准
- `AI Coding 全流程实战.html` —— 教学讲义，一般不改动
- `agents/` —— Claude Code 子代理角色定义（product-manager / ui-designer / fullstack-engineer / qa-engineer）
- `slash/` —— Claude Code 自定义 slash 命令源文件
- `.claude/` —— 本地 Claude Code 配置

## 常用命令

本项目无构建、无依赖、无测试框架。

```bash
open index.html        # 在浏览器打开游戏（macOS）
```

## 开发约定

- 改游戏逻辑或样式前，先对照 `PRD.html` / `DESIGN.html`，不要偏离已定义的范围和视觉规范
- 保持单文件结构，不要拆分或引入打包工具、npm 依赖
- 数值规则（牌型基础分、倍数、点数）严格按 PRD 表格，改动需同步文档
- 这是教学代码，命名和注释保持清晰，便于课堂逐行讲解
