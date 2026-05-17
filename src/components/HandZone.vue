<script setup>
import { useGame } from '../composables/useGame.js'
import PokerCard from './PokerCard.vue'

const { state, toggleSelect } = useGame()
</script>

<template>
  <div class="hand-zone">
    <div class="hand-zone-label">手牌 · {{ state.hand.length }} 张</div>
    <div class="hand-cards">
      <PokerCard
        v-for="card in state.hand"
        :key="card.id"
        :card="card"
        :selected="state.selected.includes(card.id)"
        @select="toggleSelect"
      />
    </div>
  </div>
</template>

<style scoped>
.hand-zone {
  padding: 16px 24px 12px;
  background: rgba(0, 0, 0, 0.2);
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  flex-shrink: 0;
}
.hand-zone-label {
  font-size: 10px;
  color: rgba(255, 255, 255, 0.4);
  letter-spacing: 1px;
  text-transform: uppercase;
  margin-bottom: 12px;
}
.hand-cards {
  display: flex;
  gap: 10px;
  justify-content: center;
  min-height: 118px;
}
</style>
