<script setup>
import { computed, onBeforeUnmount, onMounted, reactive, ref } from 'vue'
import NavBar from './components/NavBar.vue'
import AnimatedStars from './components/AnimatedAccents.vue'
import FloatingCode from './components/FloatingCode.vue'

const activeSection = ref('home')
const reveals = ref([])
const sectionIds = ['home', 'about', 'projects', 'technical-stack', 'experience', 'certifications', 'beyond', 'contact']
const contactEmail = 'tyantsi25@gmail.com'
const contactPhone = '+27782944709'

const aboutCards = [
  {
    icon: 'ID',
    label: 'Identity',
    title: 'Purpose Driven Developer',
    text: "I'm a full stack developer who is passionate about building more than just applications, and I am passionate about creating solutions that matter to people.",
  },
  {
    icon: 'JR',
    label: 'Journey',
    title: 'Academic to Practical Growth',
    text: 'My journey into tech started during my university years, where I spent four years developing my skills, building systems, and learning how to solve real world problems through code. That foundation led me into practical experience through my time at PLUMS and my current learnership, where I continue to grow both technically and professionally in real working environments.',
  },
  {
    icon: 'GR',
    label: 'Growth',
    title: 'Confidence Beyond Code',
    text: 'My growth has not only been technical. I have learned the importance of stepping outside of my comfort zone. Through public speaking, I challenged myself not because I was the best at it, but because I wanted to grow. Earning my certificate became more than just an achievement, and it became proof that I am willing to push myself and improve.',
  },
  {
    icon: 'EV',
    label: 'Evolution',
    title: 'Creativity and Human Centered Mindset',
    text: 'Beyond development, I express my creativity through crocheting, where I design and create wearable pieces. This has taught me patience, attention to detail, and how to bring ideas to life, skills that I naturally carry into my work as a developer. I believe in building with humanity, creating digital experiences that are not only functional, but meaningful and user focused. I am continuously growing, learning, and evolving, not just as a developer, but as a person.',
  },
]

const selectedAboutCardIndex = ref(0)
const selectedAboutCard = computed(() => aboutCards[selectedAboutCardIndex.value])

const projects = [
  {
    title: 'Executive Analytics Dashboard',
    tech: 'HTML, CSS, Oracle SQL',
    description: 'A completed analytics dashboard focused on presenting business metrics clearly, built with HTML and CSS and powered by Oracle SQL.',
    codeLink: 'https://oracleapex.com/ords/r/siba/ot-analytics/home?session=105384324019726',
  },
  {
    title: 'ModernTech HR System',
    tech: 'Node.js, Vue.js, CSS, MySQL',
    description: 'A completed group project for HR management, supporting employee data handling and structured internal workflows.',
    codeLink: 'https://github.com/Sibahle-Tyantsi/Module2_Backend.git',
  },
  {
    title: 'Healthy Habits eCommerce',
    tech: 'Vue.js, Node.js, CSS, JavaScript, MySQL',
    description: 'A completed group eCommerce project for healthy living products, with a customer focused shopping experience.',
    codeLink: 'https://github.com/MDtechcave/Frontend.git',
  },
]

const techStack = [
  {
    category: 'Frontend',
    icon: 'FE',
    technologies: ['HTML', 'CSS', 'Bootstrap', 'Vue.js', 'JavaScript'],
  },
  {
    category: 'Backend',
    icon: 'BE',
    technologies: ['Java', 'Node.js', 'Python', 'JavaScript'],
  },
  {
    category: 'Database',
    icon: 'DB',
    technologies: ['Oracle SQL', 'MySQL'],
  },
  {
    category: 'Tools',
    icon: 'TL',
    technologies: ['Git', 'GitHub'],
  },
]

const certifications = [
  {
    title: 'Higher Certificate in ICT',
    issuer: 'CPUT',
    icon: 'HC',
  },
  {
    title: 'Diploma in ICT: Applications Development',
    issuer: 'CPUT',
    icon: 'DIP',
  },
  {
    title: 'Life Choices Certificate',
    issuer: 'Life Choices',
    icon: 'LC',
  },
  {
    title: 'Public Speaking Certificate',
    issuer: 'Life Choices',
    icon: 'PS',
  },
  {
    title: 'Azure Certificate',
    issuer: 'Microsoft',
    icon: 'AZ',
  },
]

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

const beyondCards = [
  {
    title: 'Crochet Business Owner',
    subtitle: 'Entrepreneurship',
    description: 'Running a crochet business has strengthened my creativity, patience, discipline, and understanding of how to turn ideas into value.',
  },
  {
    title: 'Personal Growth and Leadership',
    subtitle: 'Mindset and development',
    description: 'I value growth that goes beyond technical skills, including confidence, communication, responsibility, and leading through action.',
  },
  {
    title: 'Creative and Digital Exploration',
    subtitle: 'Curiosity beyond code',
    description: 'I enjoy exploring digital ideas, visual presentation, and new ways to express creativity through both technology and design thinking.',
  },
]

const contactLinks = [
  { label: 'Phone', value: '0782944709', href: `tel:${contactPhone}` },
  { label: 'Email', value: contactEmail, href: `mailto:${contactEmail}` },
  { label: 'LinkedIn', value: 'Sibahle Tyantsi', href: 'https://www.linkedin.com/in/sibahle-tyantsi-59b58223a/' },
  { label: 'GitHub', value: 'Sibahle-Tyantsi', href: 'https://github.com/Sibahle-Tyantsi' },
]

const form = reactive({
  name: '',
  email: '',
  message: '',
})

const isSending = ref(false)
const sendStatus = ref({ type: '', message: '' })

const year = computed(() => new Date().getFullYear())

async function sendMessage() {
  if (isSending.value) {
    return
  }

  isSending.value = true
  sendStatus.value = { type: '', message: '' }

  const subject = `Portfolio contact from ${form.name || 'Website Visitor'}`
  const body = `Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`

  try {
    const payload = new FormData()
    payload.append('name', form.name)
    payload.append('email', form.email)
    payload.append('message', form.message)
    payload.append('_subject', subject)
    payload.append('_template', 'table')
    payload.append('_captcha', 'false')

    const response = await fetch(`https://formsubmit.co/ajax/${contactEmail}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
      body: payload,
    })

    const result = await response.json()

    if (!response.ok || result.success !== 'true') {
      throw new Error('Message delivery failed')
    }

    sendStatus.value = {
      type: 'success',
      message: 'Message sent successfully. I will get it in my email inbox.',
    }

    form.name = ''
    form.email = ''
    form.message = ''
  } catch {
    sendStatus.value = {
      type: 'error',
      message: 'Direct send failed on this device. Opening your email app as backup.',
    }

    const encodedSubject = encodeURIComponent(subject)
    const encodedBody = encodeURIComponent(body)
    window.location.href = `mailto:${contactEmail}?subject=${encodedSubject}&body=${encodedBody}`
  } finally {
    isSending.value = false
  }
}

function jumpTo(id) {
  const target = document.getElementById(id)
  if (!target) {
    return
  }

  target.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function handleAboutCardClick(index) {
  selectedAboutCardIndex.value = index
}

let sectionObserver
let revealObserver

onMounted(() => {
  sectionObserver = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

      if (visible.length > 0) {
        activeSection.value = visible[0].target.id
      }
    },
    {
      rootMargin: '-35% 0px -50% 0px',
      threshold: [0.2, 0.4, 0.6],
    },
  )

  sectionIds.forEach((id) => {
    const section = document.getElementById(id)
    if (section) {
      sectionObserver.observe(section)
    }
  })

  reveals.value = Array.from(document.querySelectorAll('.reveal'))
  revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          revealObserver.unobserve(entry.target)
        }
      })
    },
    {
      threshold: 0.2,
      rootMargin: '0px 0px -10% 0px',
    },
  )

  reveals.value.forEach((element) => revealObserver.observe(element))
})

onBeforeUnmount(() => {
  if (sectionObserver) {
    sectionObserver.disconnect()
  }

  if (revealObserver) {
    revealObserver.disconnect()
  }
})
</script>

<template>
  <div class="app-shell">
    <NavBar :active-section="activeSection" @navigate="jumpTo" />

    <main class="app-content">
      <section id="home" class="page-section hero-panel reveal">
        <div class="hero-copy">
          <h1>Sibahle Tyantsi</h1>
          <h2 class="hero-role-gradient">Full Stack Web Developer</h2>
          <p class="lead">
            I build purposeful digital products where clean engineering meets expressive design.
            My work focuses on clarity, performance, and experiences that feel human.
          </p>

          <div class="button-row">
            <a class="button button-primary" href="/Sibahle_Tyantsi_CV.pdf" download>
              Download CV
            </a>
            <button class="button button-secondary" type="button" @click="jumpTo('projects')">
              View Projects
            </button>
            <button class="button button-tertiary" type="button" @click="jumpTo('contact')">
              Let us Connect
            </button>
          </div>
        </div>

        <div class="hero-visual" aria-hidden="true">
          <AnimatedStars />
          <FloatingCode />
        </div>
      </section>

      <section id="about" class="page-section reveal about-section">
        <div class="section-heading">
          <p class="eyebrow">About</p>
          <h2>Who I am</h2>
        </div>
        <div class="about-swap-layout about-text-animated">
          <article class="about-detail-card">
            <div class="about-card-head">
              <span class="about-card-icon">{{ selectedAboutCard.icon }}</span>
              <span class="about-card-label">{{ selectedAboutCard.label }}</span>
            </div>
            <h3 class="about-detail-title">{{ selectedAboutCard.title }}</h3>
            <p class="section-text about-detail-text">{{ selectedAboutCard.text }}</p>
          </article>

          <div class="about-swap-panel">
            <div class="about-card-list">
              <button
                v-for="(card, index) in aboutCards"
                :key="card.label"
                type="button"
                class="about-card-list-item"
                :class="{ 'is-active': selectedAboutCardIndex === index }"
                @click="handleAboutCardClick(index)"
              >
                <span class="about-card-icon">{{ card.icon }}</span>
                <span class="about-card-label">{{ card.label }}</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      <section id="projects" class="page-section reveal">
        <div class="section-heading">
          <p class="eyebrow">Projects</p>
          <h2>Selected work</h2>
        </div>

        <div class="project-grid">
          <article v-for="project in projects" :key="project.title" class="project-card">
            <div class="project-image">
              <h3>{{ project.title }}</h3>
            </div>
            <div class="project-body">
              <p>{{ project.description }}</p>
              <p class="tech-line">{{ project.tech }}</p>
              <div class="button-row compact">
                <a class="button button-secondary" href="#">Demo</a>
                <a class="button button-secondary" :href="project.codeLink" target="_blank" rel="noopener noreferrer">Code</a>
              </div>
            </div>
          </article>
        </div>
      </section>

      <section id="technical-stack" class="page-section reveal">
        <div class="section-heading">
          <p class="eyebrow">Technical Stack</p>
          <h2>Technologies I work with</h2>
        </div>

        <div class="card-grid card-grid-two">
          <article v-for="stack in techStack" :key="stack.category" class="tech-card">
            <div class="tech-header">
              <span class="tech-icon">{{ stack.icon }}</span>
              <h3>{{ stack.category }}</h3>
            </div>
            <div class="tech-list">
              <span v-for="tech in stack.technologies" :key="tech" class="tech-tag">{{ tech }}</span>
            </div>
          </article>
        </div>
      </section>

      <section id="experience" class="page-section reveal">
        <div class="section-heading">
          <p class="eyebrow">Experience and Education</p>
          <h2>Learning, building, and growing through every step</h2>
        </div>

        <div class="timeline">
          <article v-for="item in timelineItems" :key="item.title" class="timeline-card">
            <span class="timeline-marker">{{ item.icon }}</span>
            <div class="timeline-content">
              <div class="timeline-header">
                <h3>{{ item.title }}</h3>
                <span class="timeline-meta">{{ item.meta }}</span>
              </div>
              <ul class="detail-list">
                <li v-for="point in item.points" :key="point">{{ point }}</li>
              </ul>
            </div>
          </article>
        </div>
      </section>

      <section id="certifications" class="page-section reveal">
        <div class="section-heading">
          <p class="eyebrow">Certifications</p>
          <h2>Professional qualifications and achievements</h2>
        </div>

        <div class="cert-list">
          <article v-for="cert in certifications" :key="cert.title" class="cert-card">
            <span class="cert-icon">{{ cert.icon }}</span>
            <div class="cert-content">
              <h3>{{ cert.title }}</h3>
              <p class="cert-issuer">{{ cert.issuer }}</p>
            </div>
          </article>
        </div>
      </section>

      <section id="beyond" class="page-section reveal">
        <div class="section-heading">
          <p class="eyebrow">Beyond Code</p>
          <h2>The person behind the developer journey</h2>
        </div>

        <div class="card-grid card-grid-three">
          <article v-for="card in beyondCards" :key="card.title" class="info-card">
            <p class="card-subtitle">{{ card.subtitle }}</p>
            <h3>{{ card.title }}</h3>
            <p>{{ card.description }}</p>
          </article>
        </div>

        <div class="button-row" style="justify-content: center; margin-top: 2rem:">
          <a class="button button-primary" href="https://www.facebook.com/share/1ArpEbabHH/?mibextid=wwXIfr" target="_blank">View My Work</a>
        </div>
      </section>

      <section id="contact" class="page-section reveal">
        <div class="section-heading">
          <p class="eyebrow">Contact</p>
          <h2>Let us build something meaningful together</h2>
        </div>

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

            <button type="submit" class="button button-primary" :disabled="isSending">
              {{ isSending ? 'Sending...' : 'Send Message' }}
            </button>

            <p v-if="sendStatus.message" class="form-status" :class="`is-${sendStatus.type}`">
              {{ sendStatus.message }}
            </p>
          </form>

          <aside class="contact-info-card">
            <h3>Contact Information</h3>
            <div class="contact-info-list">
              <a v-for="item in contactLinks" :key="item.label" :href="item.href" class="contact-item">
                <strong>{{ item.label }}</strong>
                <small>{{ item.value }}</small>
              </a>
            </div>
          </aside>
        </div>
      </section>
    </main>

    <footer class="site-footer">
      <p>Copyright {{ year }} Sibahle Tyantsi. Crafted with purpose.</p>
    </footer>
  </div>
</template>
