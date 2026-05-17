<script setup>
import { useGame } from '../composables/useGame.js'

const { state } = useGame()
</script>

<template>
  <div class="hud">
    <div class="hud-item">
      <div class="hud-label">目标分</div>
      <div class="hud-value target">{{ state.target }}</div>
    </div>
    <div class="hud-item">
      <div class="hud-label">当前分</div>
      <div class="hud-value score">{{ state.score }}</div>
    </div>
    <div class="hud-item">
      <div class="hud-label">剩余出牌</div>
      <div class="hud-value plays">{{ state.handsLeft }}</div>
    </div>
    <div class="hud-item">
      <div class="hud-label">剩余弃牌</div>
      <div class="hud-value discards">{{ state.discardsLeft }}</div>
    </div>
  </div>
</template>

<style scoped>
.hud {
  display: flex;
  align-items: center;
  padding: 0 24px;
  height: 64px;
  background: rgba(0, 0, 0, 0.35);
  backdrop-filter: blur(4px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  flex-shrink: 0;
}
.hud-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-right: 1px solid rgba(255, 255, 255, 0.1);
  padding: 0 8px;
}
.hud-item:last-child {
  border-right: none;
}
.hud-label {
  font-size: 10px;
  color: rgba(255, 255, 255, 0.55);
  letter-spacing: 1px;
  text-transform: uppercase;
  font-weight: 600;
}
.hud-value {
  font-family: 'JetBrains Mono', monospace;
  font-size: 22px;
  font-weight: 700;
  color: #fff;
  line-height: 1.2;
  font-variant-numeric: tabular-nums;
}
.hud-value.target {
  color: var(--color-gold);
}
.hud-value.score {
  color: var(--color-score);
}
.hud-value.plays {
  color: var(--color-accent);
}
.hud-value.discards {
  color: #e06060;
}
</style>
