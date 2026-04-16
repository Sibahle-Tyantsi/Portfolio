<script setup>
import { RouterLink } from 'vue-router'

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/projects', label: 'Projects' },
  { to: '/experience', label: 'Experience & Education' },
  { to: '/beyond', label: 'Beyond Code' },
  { to: '/contact', label: 'Contact' },
]
</script>

<template>
  <header class="site-header">
    <div class="brand-block">
      <RouterLink class="brand-mark" to="/">Sibahle</RouterLink>
      <p class="brand-copy">Full Stack Web Developer</p>
    </div>

    <nav class="site-nav" aria-label="Primary navigation">
      <RouterLink
        v-for="link in links"
        :key="link.to"
        :to="link.to"
        class="nav-link"
      >
        {{ link.label }}
      </RouterLink>
    </nav>

    <a class="button button-primary nav-cv" href="/Sibahle_Tyantsi_CV.pdf" download>
      Download CV
    </a>
  </header>
</template>
