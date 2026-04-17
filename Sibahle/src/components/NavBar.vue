<script setup>
const props = defineProps({
  activeSection: {
    type: String,
    default: 'home',
  },
})

const emit = defineEmits(['navigate'])

const links = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'technical-stack', label: 'Tech Stack' },
  { id: 'experience', label: 'Experience' },  { id: 'certifications', label: 'Certifications' },  { id: 'beyond', label: 'Beyond Code' },
  { id: 'contact', label: 'Contact' },
]

function navigateTo(id) {
  emit('navigate', id)
}
</script>

<template>
  <header class="site-header">
    <div class="brand-block">
      <a class="brand-mark" href="#home" @click.prevent="navigateTo('home')">Sibahle</a>
      <p class="brand-copy">Full Stack Web Developer</p>
    </div>

    <nav class="site-nav" aria-label="Primary navigation">
      <a
        v-for="link in links"
        :key="link.id"
        :href="`#${link.id}`"
        class="nav-link"
        :class="{ 'is-active': props.activeSection === link.id }"
        @click.prevent="navigateTo(link.id)"
      >
        {{ link.label }}
      </a>
    </nav>
  </header>
</template>
