<script setup>
import { useGame } from '../composables/useGame.js'

const { canPlay, canDiscard, play, discard, newGame } = useGame()
</script>

<template>
  <div class="action-bar">
    <button class="btn btn-play" :disabled="!canPlay" @click="play">出牌</button>
    <button class="btn btn-discard" :disabled="!canDiscard" @click="discard">
      弃牌
    </button>
    <button class="btn btn-restart" @click="newGame">重新开始</button>
  </div>
</template>

<style scoped>
.action-bar {
  display: flex;
  align-items: center;
  gap: 12px;
  justify-content: center;
  padding: 14px 24px;
  background: rgba(0, 0, 0, 0.3);
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  flex-shrink: 0;
}
</style>
