import { reactive, computed } from 'vue'
import {
  buildDeck,
  shuffle,
  scoreFor,
  HAND_SIZE,
  MAX_SELECT,
  TARGET,
  MAX_PLAYS,
  MAX_DISCARDS
} from '../game/engine.js'

// 全局唯一的游戏状态。组件通过 useGame() 共享同一份状态。
const state = reactive({
  deck: [],
  hand: [],
  selected: [], // 存 card.id
  score: 0,
  target: TARGET,
  handsLeft: MAX_PLAYS,
  discardsLeft: MAX_DISCARDS,
  gameStatus: 'playing' // 'playing' | 'win' | 'lose'
})

// 计分飘字队列：{ id, points }，由 PlayZone 消费后自行移除
const scorePops = reactive([])
let popSeq = 0

function newGame() {
  const deck = shuffle(buildDeck())
  const hand = deck.splice(0, HAND_SIZE)
  state.deck = deck
  state.hand = hand
  state.selected = []
  state.score = 0
  state.target = TARGET
  state.handsLeft = MAX_PLAYS
  state.discardsLeft = MAX_DISCARDS
  state.gameStatus = 'playing'
}

const selectedCards = computed(() =>
  state.hand.filter((c) => state.selected.includes(c.id))
)

// 当前选中牌的牌型与得分预览
const currentScore = computed(() => scoreFor(selectedCards.value))

const canPlay = computed(
  () =>
    state.gameStatus === 'playing' &&
    state.selected.length > 0 &&
    state.handsLeft > 0
)

const canDiscard = computed(
  () =>
    state.gameStatus === 'playing' &&
    state.selected.length > 0 &&
    state.discardsLeft > 0
)

function toggleSelect(id) {
  if (state.gameStatus !== 'playing') return
  const idx = state.selected.indexOf(id)
  if (idx !== -1) {
    state.selected.splice(idx, 1)
  } else {
    if (state.selected.length >= MAX_SELECT) return
    state.selected.push(id)
  }
}

// 出牌 / 弃牌后：移除已选牌，从牌堆补满 8 张
function refill() {
  const sel = state.selected.slice()
  state.hand = state.hand.filter((c) => !sel.includes(c.id))
  const need = HAND_SIZE - state.hand.length
  const drawn = state.deck.splice(0, Math.min(need, state.deck.length))
  state.hand = state.hand.concat(drawn)
  state.selected = []
}

function checkEnd() {
  if (state.score >= state.target) {
    state.gameStatus = 'win'
  } else if (state.handsLeft <= 0) {
    state.gameStatus = 'lose'
  }
}

function play() {
  if (!canPlay.value) return
  const res = currentScore.value
  state.score += res.points
  state.handsLeft -= 1
  scorePops.push({ id: ++popSeq, points: res.points })
  refill()
  checkEnd()
}

function discard() {
  if (!canDiscard.value) return
  state.discardsLeft -= 1
  refill() // 弃牌不计分
  checkEnd()
}

function consumeScorePop(id) {
  const idx = scorePops.findIndex((p) => p.id === id)
  if (idx !== -1) scorePops.splice(idx, 1)
}

export function useGame() {
  return {
    state,
    scorePops,
    selectedCards,
    currentScore,
    canPlay,
    canDiscard,
    newGame,
    toggleSelect,
    play,
    discard,
    consumeScorePop,
    MAX_SELECT
  }
}
