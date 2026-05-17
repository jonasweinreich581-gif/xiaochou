<script setup>
import { computed } from 'vue'
import { useGame } from '../composables/useGame.js'

const { state, newGame } = useGame()

const isOver = computed(() => state.gameStatus !== 'playing')
const isWin = computed(() => state.gameStatus === 'win')
</script>

<template>
  <div class="overlay" :class="{ show: isOver }">
    <div class="toast" :class="isWin ? 'win' : 'lose'">
      <div class="t-title">{{ isWin ? 'Beat the Blind' : '游戏失败' }}</div>
      <div class="t-body">
        {{ isWin ? '目标达成！恭喜通关。' : '出牌机会耗尽，未达到目标分。' }}
      </div>
      <div class="t-score">得分 {{ state.score }} / {{ state.target }}</div>
      <button class="btn btn-play" @click="newGame">重新开始</button>
    </div>
  </div>
</template>

<style scoped>
.overlay {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(3px);
  z-index: 50;
  opacity: 0;
  pointer-events: none;
  transition: opacity 250ms ease;
}
.overlay.show {
  opacity: 1;
  pointer-events: auto;
}
.toast {
  background: #0d0d0d;
  border-radius: 16px;
  padding: 36px 48px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
  max-width: 420px;
}
.toast.win {
  border: 2px solid var(--color-gold);
}
.toast.lose {
  border: 2px solid var(--color-discard);
}
.t-title {
  font-size: 26px;
  font-weight: 700;
}
.toast.win .t-title {
  color: var(--color-gold);
}
.toast.lose .t-title {
  color: #e06060;
}
.t-body {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.75);
  line-height: 1.6;
}
.t-score {
  font-family: 'JetBrains Mono', monospace;
  font-size: 18px;
  font-weight: 700;
  color: #fff;
}
</style>
