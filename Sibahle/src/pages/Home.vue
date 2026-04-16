<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <section class="home-page">
    <div class="hero-card">
      <div class="hero-copy">
        <p class="intro">HI THERE! I AM</p>
        <h1 class="name">Sibahle Tyantsi</h1>
        <h2 class="role">Full Stack Web Developer</h2>

        <p class="summary">
          Passionate about building digital experiences with purpose where code meets with creativity and growth.
          By turning ideas into reality, in tech and beyond.
        </p>

        <div class="hero-actions">
          <a href="/Sibahle_Tyantsi_CV.pdf" class="download-link" download>
            Download CV
          </a>

          <RouterLink to="/projects" class="projects-button">
            View Projects
          </RouterLink>
        </div>
      </div>

      <div class="hero-art" aria-hidden="true">
        <div class="floating-tag">
          <span>+</span>
          <span>::</span>
          <span>x</span>
        </div>

        <div class="shape octagon"></div>
        <div class="shape lavender-circle"></div>
        <div class="shape pink-circle"></div>
        <div class="shape aqua-circle"></div>
        <div class="shape gold-circle"></div>
        <div class="shape green-circle"></div>
        <div class="shape indigo-circle"></div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.home-page {
  max-width: 1520px;
  margin: 0 auto;
}

.hero-card {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(520px, 0.95fr);
  gap: 24px;
  align-items: center;
  min-height: 620px;
  padding: 18px 48px 28px 48px;
  border: 1px solid #f2b6ff;
  background: #f7fcfb;
  overflow: hidden;
}

.hero-copy {
  padding: 12px 0 12px 44px;
}

.intro {
  margin: 0 0 18px;
  color: #111827;
  font-size: 22px;
  font-weight: 500;
  letter-spacing: 0.01em;
}

.name {
  margin: 0 0 24px;
  color: #000000;
  font-size: 44px;
  font-weight: 700;
  line-height: 1.12;
}

.role {
  margin: 0 0 42px;
  font-size: 48px;
  font-weight: 700;
  line-height: 1.1;
  background: linear-gradient(90deg, #5f63ff 0%, #4d78ff 35%, #35baf1 72%, #33c7f0 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.summary {
  max-width: 640px;
  margin: 0;
  color: #273245;
  font-size: 27px;
  line-height: 1.35;
}

.hero-actions {
  display: flex;
  align-items: center;
  gap: 0;
  margin-top: 28px;
}

.download-link,
.projects-button {
  min-width: 184px;
  padding: 19px 24px;
  text-align: center;
  font-size: 18px;
  font-weight: 600;
  border-radius: 6px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.download-link {
  border: 3px solid #4e6df9;
  background: #f7fcfb;
  color: #4e6df9;
  box-shadow: 0 12px 18px rgba(93, 114, 255, 0.28);
}

.projects-button {
  margin-left: -1px;
  background: #3f5ef5;
  color: #ffffff;
  box-shadow: 0 10px 20px rgba(63, 94, 245, 0.26);
}

.download-link:hover,
.projects-button:hover {
  transform: translateY(-2px);
}

.hero-art {
  position: relative;
  min-height: 560px;
}

.floating-tag {
  position: absolute;
  top: -2px;
  left: 54px;
  display: inline-flex;
  gap: 20px;
  align-items: center;
  padding: 8px 22px 9px;
  background: #f4b1ff;
  color: #111827;
  font-size: 18px;
  font-weight: 700;
  line-height: 1;
  clip-path: polygon(12% 0, 100% 0, 88% 100%, 0 100%);
}

.shape {
  position: absolute;
  border-radius: 50%;
}

.octagon {
  top: -6px;
  left: 126px;
  width: 348px;
  height: 352px;
  border-radius: 0;
  background: rgba(134, 130, 236, 0.72);
  clip-path: polygon(26% 0, 74% 0, 100% 24%, 100% 76%, 74% 100%, 26% 100%, 0 76%, 0 24%);
  animation: drift 9s ease-in-out infinite;
}

.lavender-circle {
  top: 108px;
  right: 24px;
  width: 316px;
  height: 316px;
  background: rgba(171, 145, 245, 0.44);
  animation: drift 11s ease-in-out infinite;
}

.pink-circle {
  top: 22px;
  right: -12px;
  width: 208px;
  height: 208px;
  background: rgba(226, 125, 182, 0.58);
  animation: drift 10s ease-in-out infinite;
}

.aqua-circle {
  top: 366px;
  left: 162px;
  width: 292px;
  height: 292px;
  background: rgba(99, 221, 234, 0.58);
  animation: drift 12s ease-in-out infinite;
}

.gold-circle {
  top: 224px;
  right: 84px;
  width: 114px;
  height: 114px;
  background: rgba(244, 198, 69, 0.7);
  animation: drift 8s ease-in-out infinite;
}

.green-circle {
  right: 176px;
  bottom: -28px;
  width: 188px;
  height: 188px;
  background: rgba(105, 223, 187, 0.63);
  animation: drift 10s ease-in-out infinite;
}

.indigo-circle {
  left: 258px;
  bottom: -18px;
  width: 92px;
  height: 92px;
  background: rgba(106, 103, 235, 0.82);
  animation: drift 7s ease-in-out infinite;
}

@keyframes drift {
  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-14px);
  }
}

@media (max-width: 1100px) {
  .hero-card {
    grid-template-columns: 1fr;
    padding: 24px;
  }

  .hero-copy {
    padding: 0;
  }

  .hero-art {
    min-height: 520px;
  }
}

@media (max-width: 768px) {
  .hero-card {
    min-height: auto;
    padding: 20px 18px 28px;
  }

  .intro {
    font-size: 18px;
  }

  .name {
    font-size: 34px;
  }

  .role {
    font-size: 32px;
    margin-bottom: 24px;
  }

  .summary {
    font-size: 20px;
  }

  .hero-actions {
    flex-direction: column;
    align-items: stretch;
    gap: 12px;
  }

  .projects-button {
    margin-left: 0;
  }

  .hero-art {
    min-height: 420px;
    overflow: hidden;
  }

  .floating-tag {
    left: 16px;
    top: 0;
  }

  .octagon {
    left: 40px;
    width: 250px;
    height: 252px;
  }

  .lavender-circle {
    top: 120px;
    right: 8px;
    width: 230px;
    height: 230px;
  }

  .pink-circle {
    width: 150px;
    height: 150px;
  }

  .aqua-circle {
    left: 70px;
    top: 260px;
    width: 210px;
    height: 210px;
  }

  .gold-circle {
    right: 30px;
    top: 230px;
  }

  .green-circle {
    right: 90px;
    width: 130px;
    height: 130px;
  }

  .indigo-circle {
    left: 130px;
    width: 72px;
    height: 72px;
  }
}
</style>
