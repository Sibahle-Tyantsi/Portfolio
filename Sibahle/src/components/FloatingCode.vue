<script setup>
import { onMounted, ref } from 'vue'

const particles = ref([])

const codeSnippets = [
  '{ }',
  '< />',
  'const',
  'async',
  'await',
  'import',
  'export',
  'function',
  'class',
  'interface',
  '=>',
  'fetch',
  'API',
  'REST',
  'SQL',
]

onMounted(() => {
  // Generate floating particles with code snippets
  for (let i = 0; i < 12; i++) {
    particles.value.push({
      id: i,
      snippet: codeSnippets[Math.floor(Math.random() * codeSnippets.length)],
      startX: Math.random() * 100,
      startY: Math.random() * 100,
      size: Math.random() * 14 + 10,
      duration: Math.random() * 10 + 10,
      delay: Math.random() * 5,
      opacity: Math.random() * 0.4 + 0.2,
    })
  }
})
</script>

<template>
  <div class="floating-code" aria-hidden="true">
    <div
      v-for="particle in particles"
      :key="particle.id"
      class="code-particle"
      :style="{
        '--start-x': `${particle.startX}%`,
        '--start-y': `${particle.startY}%`,
        '--duration': `${particle.duration}s`,
        '--delay': `${particle.delay}s`,
        '--size': `${particle.size}px`,
        '--opacity': particle.opacity,
      }"
    >
      <span class="code-text">{{ particle.snippet }}</span>
    </div>
  </div>
</template>

<style scoped>
.floating-code {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  pointer-events: none;
}

.code-particle {
  position: absolute;
  left: var(--start-x);
  top: var(--start-y);
  font-family: 'Monaco', 'Courier New', monospace;
  font-size: var(--size);
  font-weight: 600;
  letter-spacing: 1px;
  pointer-events: none;
  animation: float var(--duration) ease-in-out var(--delay) infinite;
}

.code-text {
  display: inline-block;
  color: rgba(124, 58, 237, var(--opacity));
  text-shadow: 0 0 10px rgba(124, 58, 237, calc(var(--opacity) * 0.8)),
    0 0 20px rgba(192, 132, 252, calc(var(--opacity) * 0.4));
  filter: blur(0.3px);
  transition: all 3s ease-in-out;
}

.code-particle:hover .code-text {
  color: rgba(192, 132, 252, calc(var(--opacity) + 0.3));
  text-shadow: 0 0 15px rgba(192, 132, 252, calc(var(--opacity) * 1)),
    0 0 30px rgba(124, 58, 237, calc(var(--opacity) * 0.6));
  filter: blur(0px);
}

@keyframes float {
  0% {
    transform: translateY(0) translateX(0) rotate(0deg) scale(0.8);
    opacity: 0;
  }
  10% {
    opacity: var(--opacity);
  }
  50% {
    transform: translateY(-80px) translateX(30px) rotate(180deg) scale(1);
    opacity: var(--opacity);
  }
  90% {
    opacity: var(--opacity);
  }
  100% {
    transform: translateY(-160px) translateX(-20px) rotate(360deg) scale(0.8);
    opacity: 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .code-particle {
    animation: none;
  }

  .code-text {
    color: rgba(124, 58, 237, calc(var(--opacity) * 1.5));
  }
}
</style>
