// 小丑牌核心引擎 —— 纯函数，不依赖 Vue / DOM
// 规则来源：PRD.html ③ 牌型 & 计分

export const SUITS = ['♥', '♦', '♣', '♠']
export const RED_SUITS = ['♥', '♦']
export const RANKS = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K']

export const HAND_SIZE = 8
export const MAX_SELECT = 5
export const TARGET = 300
export const MAX_PLAYS = 4
export const MAX_DISCARDS = 3

// 牌型 → { name, base, mult }
export const HAND_TYPES = {
  royal_flush: { name: '皇家同花顺', base: 100, mult: 8 },
  straight_flush: { name: '同花顺', base: 100, mult: 8 },
  four_kind: { name: '四条', base: 60, mult: 7 },
  full_house: { name: '葫芦', base: 40, mult: 4 },
  flush: { name: '同花', base: 35, mult: 4 },
  straight: { name: '顺子', base: 30, mult: 4 },
  three_kind: { name: '三条', base: 30, mult: 3 },
  two_pair: { name: '两对', base: 20, mult: 2 },
  pair: { name: '对子', base: 10, mult: 2 },
  high_card: { name: '高牌', base: 5, mult: 1 }
}

// 点数：A=11，K/Q/J=10，2-10 面值
export function rankValue(rank) {
  if (rank === 'A') return 11
  if (rank === 'K' || rank === 'Q' || rank === 'J') return 10
  return parseInt(rank, 10)
}

// 顺子用的序数：A 既可作 1 也可作 14
export function rankOrder(rank) {
  if (rank === 'A') return 14
  if (rank === 'K') return 13
  if (rank === 'Q') return 12
  if (rank === 'J') return 11
  return parseInt(rank, 10)
}

export function buildDeck() {
  const deck = []
  for (const suit of SUITS) {
    for (const rank of RANKS) {
      deck.push({ suit, rank, value: rankValue(rank), id: suit + rank })
    }
  }
  return deck
}

// Fisher–Yates 洗牌（原地）
export function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

// 输入 1–5 张 card，返回牌型 key
export function evaluate(cards) {
  const n = cards.length
  if (n === 0) return null

  const orders = cards.map((c) => rankOrder(c.rank)).sort((a, b) => a - b)
  const suits = cards.map((c) => c.suit)

  const rankCount = {}
  cards.forEach((c) => {
    rankCount[c.rank] = (rankCount[c.rank] || 0) + 1
  })
  const counts = Object.values(rankCount).sort((a, b) => b - a)

  const isFlush = n === 5 && suits.every((s) => s === suits[0])

  // 顺子：5 张、点数唯一、连续；A 可作 1（A2345）或 14（10JQKA）
  let isStraight = false
  let straightHigh = 0
  if (n === 5) {
    const uniq = orders.filter((v, i) => orders.indexOf(v) === i)
    if (uniq.length === 5) {
      if (uniq[4] - uniq[0] === 4) {
        isStraight = true
        straightHigh = uniq[4]
      } else if (uniq[0] === 2 && uniq[1] === 3 && uniq[2] === 4 && uniq[3] === 5 && uniq[4] === 14) {
        isStraight = true
        straightHigh = 5
      }
    }
  }

  if (isStraight && isFlush) {
    return straightHigh === 14 ? 'royal_flush' : 'straight_flush'
  }
  if (counts[0] === 4) return 'four_kind'
  if (counts[0] === 3 && counts[1] === 2) return 'full_house'
  if (isFlush) return 'flush'
  if (isStraight) return 'straight'
  if (counts[0] === 3) return 'three_kind'
  if (counts[0] === 2 && counts[1] === 2) return 'two_pair'
  if (counts[0] === 2) return 'pair'
  return 'high_card'
}

// 得分 = (基础分 + 入选牌点数之和) × 倍数
export function scoreFor(cards) {
  const type = evaluate(cards)
  if (!type) return { type: null, def: null, points: 0 }
  const def = HAND_TYPES[type]
  const sum = cards.reduce((acc, c) => acc + c.value, 0)
  return { type, def, points: (def.base + sum) * def.mult }
}
