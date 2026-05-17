<script setup>
import { computed } from 'vue'
import { RED_SUITS } from '../game/engine.js'

const props = defineProps({
  card: { type: Object, required: true },
  selected: { type: Boolean, default: false },
  inPlay: { type: Boolean, default: false }
})

const emit = defineEmits(['select'])

const isRed = computed(() => RED_SUITS.includes(props.card.suit))

function onClick() {
  if (!props.inPlay) emit('select', props.card.id)
}
</script>

<template>
  <div
    class="poker-card"
    :class="[
      isRed ? 'red-card' : 'black-card',
      { 'card-selected': selected, 'in-play': inPlay }
    ]"
    @click="onClick"
  >
    <div class="corner tl">
      <span class="rank">{{ card.rank }}</span>
      <span class="suit">{{ card.suit }}</span>
    </div>
    <div class="center-suit">{{ card.suit }}</div>
    <div class="corner br">
      <span class="rank">{{ card.rank }}</span>
      <span class="suit">{{ card.suit }}</span>
    </div>
  </div>
</template>

<style scoped>
.poker-card {
  width: 82px;
  height: 118px;
  background: var(--color-card-bg);
  border-radius: var(--radius-card);
  position: relative;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.18), 0 0 0 1px rgba(0, 0, 0, 0.08);
  transition: transform var(--ease-card), box-shadow var(--ease-card);
  cursor: pointer;
  user-select: none;
  flex-shrink: 0;
}
.corner {
  position: absolute;
  line-height: 1;
  font-weight: 700;
}
.corner.tl {
  top: 5px;
  left: 6px;
  text-align: left;
}
.corner.br {
  bottom: 5px;
  right: 6px;
  text-align: right;
  transform: rotate(180deg);
}
.corner .rank {
  font-size: 14px;
  display: block;
}
.corner .suit {
  font-size: 11px;
  display: block;
}
.center-suit {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 40px;
  line-height: 1;
}
.red-card .corner,
.red-card .center-suit {
  color: var(--color-card-red);
}
.black-card .corner,
.black-card .center-suit {
  color: var(--color-card-black);
}
.card-selected {
  transform: translateY(-12px);
  box-shadow: 0 0 0 2.5px var(--color-accent), 0 8px 20px rgba(232, 104, 42, 0.35);
}
.poker-card:not(.card-selected):not(.in-play):hover {
  transform: translateY(-4px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.22);
}
.poker-card.in-play {
  cursor: default;
}
</style>
