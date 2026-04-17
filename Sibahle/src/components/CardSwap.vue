<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

const props = defineProps({
  cardDistance: { type: Number, default: 60 },
  verticalDistance: { type: Number, default: 70 },
  delay: { type: Number, default: 5000 },
  skewAmount: { type: Number, default: 6 },
  easing: { type: String, default: 'elastic' },
  pauseOnHover: { type: Boolean, default: false },
  cardCount: { type: Number, default: 3 },
})

const emit = defineEmits(['card-click'])

const activeIndex = ref(0)
const isHovered = ref(false)
let intervalId

const order = computed(() => {
  return Array.from({ length: props.cardCount }, (_, index) => {
    const relative = (index - activeIndex.value + props.cardCount) % props.cardCount
    return { index, relative }
  })
})

function nextCard() {
  activeIndex.value = (activeIndex.value + 1) % props.cardCount
}

function handleCardClick(index) {
  activeIndex.value = index
  emit('card-click', index)
}

onMounted(() => {
  intervalId = window.setInterval(() => {
    if (props.pauseOnHover && isHovered.value) {
      return
    }

    nextCard()
  }, props.delay)
})

onBeforeUnmount(() => {
  if (intervalId) {
    window.clearInterval(intervalId)
  }
})
</script>

<template>
  <div
    class="card-swap"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
  >
    <button
      v-for="item in order"
      :key="item.index"
      type="button"
      class="swap-card"
      :class="{ 'is-active': item.relative === 0 }"
      :style="{
        transform: `translate(${item.relative * cardDistance}px, ${item.relative * verticalDistance}px) skewY(${item.relative * skewAmount}deg)`,
        zIndex: cardCount - item.relative,
        transitionTimingFunction: easing === 'elastic' ? 'cubic-bezier(0.34, 1.56, 0.64, 1)' : 'ease',
      }"
      @click="handleCardClick(item.index)"
    >
      <slot :name="`card-${item.index}`" />
    </button>
  </div>
</template>

<style scoped>
.card-swap {
  position: relative;
  width: 100%;
  max-width: 420px;
  min-height: 330px;
  overflow: hidden;
}

.swap-card {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  border: 1px solid rgba(168, 85, 247, 0.22);
  border-radius: 16px;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.96), rgba(248, 241, 255, 0.84));
  box-shadow: 0 14px 28px rgba(88, 28, 135, 0.12);
  cursor: pointer;
  text-align: left;
  overflow: hidden;
  transition: transform 0.65s, box-shadow 0.35s, border-color 0.35s;
  color: inherit;
  padding: 0;
}

.swap-card:hover {
  border-color: rgba(124, 58, 237, 0.45);
  box-shadow: 0 18px 38px rgba(88, 28, 135, 0.16);
}

.swap-card.is-active {
  border-color: rgba(124, 58, 237, 0.5);
  box-shadow: 0 20px 44px rgba(88, 28, 135, 0.18);
}
</style>
