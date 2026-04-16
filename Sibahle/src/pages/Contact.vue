<script setup>
import { reactive } from 'vue'

const contactLinks = [
  {
    label: 'Phone',
    value: '0782944709',
    href: 'tel:0782944709',
    icon: 'PH',
  },
  {
    label: 'Email',
    value: 'tyantsi25@gmail.com',
    href: 'mailto:tyantsi25@gmail.com',
    icon: 'EM',
  },
  {
    label: 'LinkedIn',
    value: 'Add your LinkedIn profile link',
    href: '#',
    icon: 'IN',
  },
  {
    label: 'GitHub',
    value: 'Add your GitHub profile link',
    href: '#',
    icon: 'GH',
  },
]

const form = reactive({
  name: '',
  email: '',
  message: '',
})

function sendMessage() {
  const subject = encodeURIComponent(`Portfolio contact from ${form.name || 'Website Visitor'}`)
  const body = encodeURIComponent(
    `Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`,
  )

  window.location.href = `mailto:tyantsi25@gmail.com?subject=${subject}&body=${body}`
}
</script>

<template>
  <section class="page-section">
    <div class="section-heading">
      <p class="eyebrow">Contact</p>
      <h1>Let's connect</h1>
    </div>
    <p class="lead">
      If you'd like to collaborate, discuss opportunities, or reach out about my work, I'd love to hear from you.
    </p>

    <div class="contact-layout">
      <form class="contact-form" @submit.prevent="sendMessage">
        <label class="field">
          <span>Name</span>
          <input v-model="form.name" type="text" name="name" placeholder="Your name" />
        </label>

        <label class="field">
          <span>Email</span>
          <input v-model="form.email" type="email" name="email" placeholder="your@email.com" />
        </label>

        <label class="field">
          <span>Message</span>
          <textarea
            v-model="form.message"
            name="message"
            rows="6"
            placeholder="Tell me about your project or opportunity"
          ></textarea>
        </label>

        <button type="submit" class="button button-primary">Send</button>
      </form>

      <aside class="contact-info-card">
        <h2>Contact Information</h2>
        <div class="contact-info-list">
          <a v-for="item in contactLinks" :key="item.label" :href="item.href" class="contact-item">
            <span class="contact-icon">{{ item.icon }}</span>
            <span>
              <strong>{{ item.label }}</strong>
              <small>{{ item.value }}</small>
            </span>
          </a>
        </div>
      </aside>
    </div>
  </section>
</template>
