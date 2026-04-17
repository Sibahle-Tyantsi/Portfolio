<script setup>
import { onMounted, ref } from 'vue'

const stars = ref([])
const galaxies = ref([])

onMounted(() => {
  // Generate random stars
  for (let i = 0; i < 150; i++) {
    stars.value.push({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2.5 + 0.5,
      opacity: Math.random() * 0.7 + 0.3,
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 2,
    })
  }

  // Generate galaxy clusters
  for (let i = 0; i < 3; i++) {
    galaxies.value.push({
      cx: Math.random() * 100,
      cy: Math.random() * 100,
      size: Math.random() * 80 + 60,
      rotation: Math.random() * 360,
      duration: Math.random() * 20 + 15,
    })
  }
})
</script>

<template>
  <svg class="animated-galaxy" viewBox="0 0 1000 400" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    <!-- Nebula/Galaxy background elements -->
    <defs>
      <filter id="nebulaBglow">
        <feGaussianBlur stdDeviation="4" result="coloredBlur" />
        <feMerge>
          <feMergeNode in="coloredBlur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>

      <filter id="starGlow">
        <feGaussianBlur stdDeviation="2.6" result="coloredBlur" />
        <feMerge>
          <feMergeNode in="coloredBlur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>

      <radialGradient id="galaxyGrad1">
        <stop offset="0%" style="stop-color: rgba(124, 58, 237, 0.65); stop-opacity: 0.85" />
        <stop offset="50%" style="stop-color: rgba(192, 132, 252, 0.35); stop-opacity: 0.5" />
        <stop offset="100%" style="stop-color: rgba(26, 16, 44, 0); stop-opacity: 0" />
      </radialGradient>

      <radialGradient id="galaxyGrad2">
        <stop offset="0%" style="stop-color: rgba(139, 92, 246, 0.55); stop-opacity: 0.75" />
        <stop offset="50%" style="stop-color: rgba(168, 85, 247, 0.28); stop-opacity: 0.4" />
        <stop offset="100%" style="stop-color: rgba(26, 16, 44, 0); stop-opacity: 0" />
      </radialGradient>

      <radialGradient id="galaxyGrad3">
        <stop offset="0%" style="stop-color: rgba(162, 155, 254, 0.48); stop-opacity: 0.68" />
        <stop offset="50%" style="stop-color: rgba(192, 132, 252, 0.2); stop-opacity: 0.32" />
        <stop offset="100%" style="stop-color: rgba(26, 16, 44, 0); stop-opacity: 0" />
      </radialGradient>
    </defs>

    <!-- Animated galaxy clusters -->
    <g v-for="(galaxy, idx) in galaxies" :key="`galaxy-${idx}`" class="galaxy-cluster">
      <circle
        :cx="`${galaxy.cx}%`"
        :cy="`${galaxy.cy}%`"
        :r="`${galaxy.size}px`"
        :fill="`url(#galaxyGrad${(idx % 3) + 1})`"
        class="galaxy-blob"
        :style="{ '--rotation': galaxy.rotation, '--duration': galaxy.duration }"
      />
    </g>

    <!-- Animated stars with twinkling -->
    <g class="stars">
      <circle
        v-for="(star, idx) in stars"
        :key="`star-${idx}`"
        :cx="`${star.x}%`"
        :cy="`${star.y}%`"
        :r="`${star.size}px`"
        :opacity="star.opacity"
        fill="#ffffff"
        filter="url(#starGlow)"
        class="star"
        :style="{
          '--duration': star.duration,
          '--delay': star.delay,
          '--size': star.size,
        }"
      />
    </g>

    <!-- Additional shimmer effects -->
    <g class="shimmer-lines">
      <line x1="10%" y1="50%" x2="40%" y2="30%" stroke="rgba(124, 58, 237, 0.15)" stroke-width="1" class="shimmer" />
      <line x1="60%" y1="20%" x2="90%" y2="70%" stroke="rgba(192, 132, 252, 0.15)" stroke-width="1" class="shimmer" />
      <line x1="80%" y1="10%" x2="50%" y2="60%" stroke="rgba(139, 92, 246, 0.1)" stroke-width="1" class="shimmer" />
    </g>
  </svg>
</template>

<style scoped>
.animated-galaxy {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.galaxy-cluster {
  animation: galaxyRotate var(--duration, 20s) linear infinite;
  transform-origin: center;
}

@keyframes galaxyRotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.galaxy-blob {
  animation: galaxyPulse 8s ease-in-out infinite;
  filter: blur(1.4px) drop-shadow(0 0 26px rgba(139, 92, 246, 0.55));
}

@keyframes galaxyPulse {
  0%,
  100% {
    opacity: 0.45;
    filter: blur(1.4px) drop-shadow(0 0 18px rgba(124, 58, 237, 0.45));
  }
  50% {
    opacity: 0.82;
    filter: blur(0.8px) drop-shadow(0 0 34px rgba(192, 132, 252, 0.75));
  }
}

.stars {
  animation: starsShift 60s linear infinite;
}

@keyframes starsShift {
  0% {
    transform: translateX(0) translateY(0);
  }
  100% {
    transform: translateX(-10px) translateY(-10px);
  }
}

.star {
  animation: twinkle var(--duration, 3s) ease-in-out var(--delay, 0s) infinite;
}

@keyframes twinkle {
  0%,
  100% {
    opacity: var(--default-opacity, 0.3);
    r: var(--size);
    filter: drop-shadow(0 0 4px rgba(124, 58, 237, 0.65));
  }
  50% {
    opacity: 1;
    r: calc(var(--size) * 1.7);
    filter: drop-shadow(0 0 10px rgba(192, 132, 252, 0.95));
  }
}

.shimmer {
  animation: shimmerFlow 4s ease-in-out infinite;
  stroke-linecap: round;
}

@keyframes shimmerFlow {
  0% {
    stroke-dasharray: 100;
    stroke-dashoffset: 100;
    opacity: 0;
  }
  50% {
    opacity: 0.65;
  }
  100% {
    stroke-dasharray: 100;
    stroke-dashoffset: -100;
    opacity: 0;
  }
}

.shimmer:nth-child(2) {
  animation-delay: 1s;
}

.shimmer:nth-child(3) {
  animation-delay: 2s;
}
</style>
