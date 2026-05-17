# 小丑牌 Web · V1.0.0

基于扑克牌型的单机数值小游戏。手选 1–5 张组成牌型，限 4 次出牌内累计超过 300 分即胜。

这是「AI 全流程开发」课程的教学项目——零基础学员通过亲手实现这款游戏，完整体验从 PRD → 设计 → 实现 → 验收的开发流程。

技术栈：**Vue 3 + Vite**。架构为后续用 **Tauri** 打包跨端 App 做准备。

## 项目内容

| 文件 / 目录 | 说明 |
| --- | --- |
| `src/game/engine.js` | 纯游戏引擎（牌堆 / 牌型识别 / 计分），无框架依赖 |
| `src/composables/useGame.js` | 响应式状态管理 |
| `src/components/` | UI 组件：PokerCard / GameHud / PlayZone / HandZone / ActionBar / ResultOverlay |
| `src/App.vue` | 根组件 |
| `legacy/index.html` | V1.0.0 原始单文件版本（存档，已被 Vue 版取代） |
| `docs/PRD.html` | 产品需求文档（课堂 5 分钟版） |
| `docs/AI Coding 全流程实战.html` | 配套教学讲义 |
| `design/DESIGN.html` | 设计规范（Design Tokens、页面结构、卡牌样式） |
| `claude-kit/agents/` | Claude Code 角色定义（产品 / 设计 / 全栈 / 测试） |
| `claude-kit/slash/` | Claude Code 自定义 slash 命令 |

## 安装步骤

需要 Node.js（建议 LTS 版本）：

```bash
git clone <repo-url>
cd 小丑
npm install
```

## 使用方式

```bash
npm run dev        # 本地开发，自动打开浏览器
npm run build      # 构建到 dist/
npm run preview    # 预览构建产物
```

游戏规则：

- 开局从 52 张牌发 8 张手牌
- 点击选 1–5 张牌（选中上浮），点「出牌」计分，点「弃牌」换牌不得分
- 出牌 4 次 / 弃牌 3 次，累计 ≥ 300 分获胜，机会耗尽失败
- 得分 =（基础分 + 入选牌点数之和）× 倍数；A=11，K/Q/J=10，2–10 按面值

V1.0.0 范围：标准 52 张牌、10 种牌型、胜负判定与重新开始。不含小丑牌 / 商店 / 关卡 / 动画音效 / 多人联机。
