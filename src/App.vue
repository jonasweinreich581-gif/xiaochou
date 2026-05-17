<script setup>
import { onMounted } from 'vue'
import { useGame } from './composables/useGame.js'
import GameHud from './components/GameHud.vue'
import PlayZone from './components/PlayZone.vue'
import HandZone from './components/HandZone.vue'
import ActionBar from './components/ActionBar.vue'
import ResultOverlay from './components/ResultOverlay.vue'

const { scorePops, consumeScorePop, newGame } = useGame()

onMounted(newGame)
</script>

<template>
  <div class="game-viewport">
    <GameHud />
    <PlayZone />
    <HandZone />
    <ActionBar />
    <ResultOverlay />

    <div
      v-for="pop in scorePops"
      :key="pop.id"
      class="score-pop"
      @animationend="consumeScorePop(pop.id)"
    >
      +{{ pop.points }}
    </div>
  </div>
</template>

<style scoped>
.game-viewport {
  width: 1080px;
  height: 640px;
  background: var(--color-table);
  border-radius: 16px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: 0 12px 48px rgba(0, 0, 0, 0.45);
  position: relative;
  background-image: radial-gradient(
      ellipse at 50% 100%,
      rgba(0, 0, 0, 0.25) 0%,
      transparent 70%
    ),
    repeating-linear-gradient(
      45deg,
      transparent,
      transparent 20px,
      rgba(255, 255, 255, 0.012) 20px,
      rgba(255, 255, 255, 0.012) 21px
    );
}
.score-pop {
  position: absolute;
  left: 50%;
  top: 40%;
  font-family: 'JetBrains Mono', monospace;
  font-weight: 700;
  font-size: 28px;
  color: var(--color-gold);
  pointer-events: none;
  z-index: 40;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
  animation: scorePop 1100ms ease-out forwards;
}
@keyframes scorePop {
  0% {
    opacity: 0;
    transform: translate(-50%, 0) scale(0.7);
  }
  20% {
    opacity: 1;
    transform: translate(-50%, -10px) scale(1);
  }
  100% {
    opacity: 0;
    transform: translate(-50%, -70px) scale(1);
  }
}
</style>
