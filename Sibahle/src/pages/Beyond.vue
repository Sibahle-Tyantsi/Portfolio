<script setup>
const beyondCards = [
  {
    title: 'Crochet Business Owner',
    subtitle: 'Entrepreneurship',
    description: 'Running a crochet business has strengthened my creativity, patience, discipline, and understanding of how to turn ideas into value.',
  },
  {
    title: 'Personal Growth & Leadership',
    subtitle: 'Mindset and development',
    description: 'I value growth that goes beyond technical skills, including confidence, communication, responsibility, and leading through action.',
  },
  {
    title: 'Creative & Digital Exploration',
    subtitle: 'Curiosity beyond code',
    description: 'I enjoy exploring digital ideas, visual presentation, and new ways to express creativity through both technology and design thinking.',
  },
]
</script>

<template>
  <section class="page-section">
    <div class="section-heading">
      <p class="eyebrow">Beyond Code</p>
      <h1>The person behind the developer journey</h1>
    </div>
    <div class="card-grid card-grid-three">
      <article v-for="card in beyondCards" :key="card.title" class="info-card section-card">
        <p class="card-subtitle">{{ card.subtitle }}</p>
        <h2>{{ card.title }}</h2>
        <p>{{ card.description }}</p>
      </article>
    </div>
  </section>
</template>
