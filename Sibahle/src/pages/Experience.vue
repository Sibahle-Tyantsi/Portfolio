<script setup>
const timelineItems = [
  {
    title: 'Life Choices YouthCode Programme',
    meta: '2025',
    icon: 'LC',
    points: [
      'Strengthened practical development skills through structured coding and project work.',
      'Built confidence in problem-solving, collaboration, and applying development concepts in real scenarios.',
      'Expanded understanding of professional growth within the technology space.',
    ],
  },
  {
    title: 'PLUMS Software Developer Intern',
    meta: '2025',
    icon: 'PL',
    points: [
      'Contributed to software development tasks in a professional environment.',
      'Learned from real team workflows, development practices, and implementation processes.',
      'Gained exposure to the expectations and pace of day-to-day software delivery.',
    ],
  },
  {
    title: 'Diploma in ICT: Applications Development',
    meta: 'CPUT, 2023-2026',
    icon: 'DI',
    points: [
      'Developed foundations in programming, software design, databases, and web development.',
      'Built academic and practical understanding of application development principles.',
      'Strengthened the ability to move from concepts to implementation in structured projects.',
    ],
  },
  {
    title: 'Higher Certificate in ICT',
    meta: 'CPUT, 2022',
    icon: 'HC',
    points: [
      'Established a strong technology base across core ICT concepts and digital problem-solving.',
      'Prepared for deeper application development study through technical fundamentals.',
      'Built discipline and confidence for continued growth in software development.',
    ],
  },
]
</script>

<template>
  <section class="page-section">
    <div class="section-heading">
      <p class="eyebrow">Experience & Education</p>
      <h1>Learning, building, and growing through every step</h1>
    </div>
    <div class="timeline">
      <article v-for="item in timelineItems" :key="item.title" class="timeline-card">
        <div class="timeline-marker">{{ item.icon }}</div>
        <div class="timeline-content">
          <div class="timeline-header">
            <h2>{{ item.title }}</h2>
            <span class="timeline-meta">{{ item.meta }}</span>
          </div>
          <ul class="detail-list">
            <li v-for="point in item.points" :key="point">{{ point }}</li>
          </ul>
        </div>
      </article>
    </div>
  </section>
</template>
