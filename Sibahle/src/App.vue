<script setup>
import { RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue'
</script>

<template>
  <div class="app-shell">
    <NavBar />
    <main class="app-content">
      <RouterView />
    </main>
    <footer class="site-footer">
      <div>
        <p class="footer-name">Sibahle Tyantsi</p>
        <p class="footer-copy">Full Stack Web Developer building modern, purposeful digital experiences.</p>
      </div>
      <a class="button button-secondary footer-cv" href="/Sibahle_Tyantsi_CV.pdf" download>
        Download CV
      </a>
    </footer>
  </div>
</template>
