<script setup>
import { useGame } from '../composables/useGame.js'
import PokerCard from './PokerCard.vue'

const { selectedCards, currentScore, MAX_SELECT } = useGame()
</script>

<template>
  <div class="play-zone">
    <div
      class="hand-type-badge"
      :class="{ neutral: selectedCards.length === 0 }"
    >
      <template v-if="selectedCards.length === 0">等待选牌</template>
      <template v-else>
        {{ currentScore.def.name }}　+{{ currentScore.def.base }} ×
        {{ currentScore.def.mult }} = {{ currentScore.points }}
      </template>
    </div>

    <div class="play-cards">
      <PokerCard
        v-for="card in selectedCards"
        :key="card.id"
        :card="card"
        in-play
      />
      <div
        v-for="i in Math.max(0, MAX_SELECT - selectedCards.length)"
        :key="'ph-' + i"
        class="play-placeholder"
      >
        +
      </div>
    </div>

    <div class="zone-hint">选中 1–5 张牌后点击「出牌」</div>
  </div>
</template>

<style scoped>
.play-zone {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.15);
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  position: relative;
  gap: 10px;
}
.hand-type-badge {
  background: rgba(232, 104, 42, 0.85);
  color: #fff;
  font-size: 13px;
  font-weight: 700;
  padding: 5px 18px;
  border-radius: var(--radius-btn);
  letter-spacing: 0.5px;
  box-shadow: 0 2px 8px rgba(232, 104, 42, 0.4);
  min-height: 28px;
  display: flex;
  align-items: center;
}
.hand-type-badge.neutral {
  background: rgba(255, 255, 255, 0.12);
  color: rgba(255, 255, 255, 0.6);
  box-shadow: none;
}
.play-cards {
  display: flex;
  gap: 12px;
  align-items: center;
  min-height: 128px;
}
.play-placeholder {
  width: 88px;
  height: 128px;
  border-radius: var(--radius-card);
  border: 2px dashed rgba(255, 255, 255, 0.18);
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.25);
  font-size: 24px;
}
.zone-hint {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.35);
  letter-spacing: 0.5px;
}
</style>
