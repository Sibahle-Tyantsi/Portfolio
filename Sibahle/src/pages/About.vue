<script setup>
const aboutCards = [
  {
    title: 'Who I Am',
    text: 'I am Sibahle Tyantsi, an aspiring full stack web developer focused on building professional digital products with care, structure, and purpose.',
  },
  {
    title: 'My Passion for Full Stack Development',
    text: 'Full stack development excites me because it allows me to shape both the user experience and the logic behind it, turning ideas into complete solutions.',
  },
  {
    title: 'My Learning Journey',
    text: 'My growth has been shaped by formal study, practical programmes, and real development exposure where I continue building confidence through hands-on work.',
  },
  {
    title: 'Technologies I Enjoy',
    text: 'I enjoy working with HTML, CSS, JavaScript, Java, Spring Boot, MySQL, and the tools that help transform concepts into reliable web experiences.',
  },
]
</script>

<template>
  <section class="page-section">
    <div class="section-heading">
      <p class="eyebrow">About</p>
      <h1>My journey into full stack development</h1>
    </div>
    <p class="lead">
      I'm building a career centered on thoughtful software development, continuous learning, and creating digital work that feels both useful and refined.
    </p>

    <div class="card-grid card-grid-two">
      <article v-for="card in aboutCards" :key="card.title" class="info-card section-card">
        <h2>{{ card.title }}</h2>
        <p>{{ card.text }}</p>
      </article>
    </div>
  </section>
</template>
