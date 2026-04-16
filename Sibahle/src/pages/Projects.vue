<script setup>
const projects = [
  {
    title: 'Executive Analytics Dashboard',
    tech: 'HTML, CSS, JavaScript, Chart.js',
    description: 'A dashboard concept focused on presenting business metrics clearly through interactive charts and clean executive reporting views.',
  },
  {
    title: 'ModernTech HR System',
    tech: 'Java, Spring Boot, MySQL',
    description: 'An HR management system designed to support employee data handling, structured workflows, and practical internal business operations.',
  },
  {
    title: 'Healthy Habits eCommerce',
    tech: 'Java, Spring Boot, MySQL',
    description: 'An eCommerce platform built around healthy living products, combining backend structure with a customer-focused shopping experience.',
  },
]
</script>

<template>
  <section class="page-section">
    <div class="section-heading">
      <p class="eyebrow">Projects</p>
      <h1>Selected work</h1>
    </div>
    <p class="lead">
      These projects reflect both my technical development and my interest in building digital solutions that are practical, modern, and well-structured.
    </p>

    <div class="project-grid">
      <article v-for="project in projects" :key="project.title" class="project-card">
        <div class="project-image" aria-hidden="true">
          <span>{{ project.title }}</span>
        </div>
        <div class="project-body">
          <h2>{{ project.title }}</h2>
          <p>{{ project.description }}</p>
          <p class="tech-line">Tech: {{ project.tech }}</p>
          <div class="button-row">
            <a class="button button-secondary" href="#">Demo</a>
            <a class="button button-secondary" href="#">Code</a>
          </div>
        </div>
      </article>
    </div>
  </section>
</template>
