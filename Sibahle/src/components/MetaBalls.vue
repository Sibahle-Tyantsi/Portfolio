<script setup>
import { Camera, Mesh, Program, Renderer, Transform, Triangle, Vec3 } from 'ogl'
import { onMounted, onUnmounted, ref, watch } from 'vue'

const props = defineProps({
  color: { type: String, default: '#27FF64' },
  speed: { type: Number, default: 0.3 },
  enableMouseInteraction: { type: Boolean, default: true },
  hoverSmoothness: { type: Number, default: 0.05 },
  animationSize: { type: Number, default: 30 },
  ballCount: { type: Number, default: 15 },
  clumpFactor: { type: Number, default: 1 },
  cursorBallSize: { type: Number, default: 3 },
  cursorBallColor: { type: String, default: '#27FF64' },
  enableTransparency: { type: Boolean, default: false },
  mixBlendMode: { type: String, default: 'normal' },
})

const containerRef = ref(null)

function parseHexColor(hex) {
  const normalized = hex.replace('#', '')
  const expanded = normalized.length === 3
    ? normalized.split('').map((value) => `${value}${value}`).join('')
    : normalized

  return [
    Number.parseInt(expanded.slice(0, 2), 16) / 255,
    Number.parseInt(expanded.slice(2, 4), 16) / 255,
    Number.parseInt(expanded.slice(4, 6), 16) / 255,
  ]
}

function fract(value) {
  return value - Math.floor(value)
}

function hash31(value) {
  const r = [value * 0.1031, value * 0.103, value * 0.0973].map(fract)
  const rYzx = [r[1], r[2], r[0]]
  const dotValue = r[0] * (rYzx[0] + 33.33) + r[1] * (rYzx[1] + 33.33) + r[2] * (rYzx[2] + 33.33)

  return r.map((entry) => fract(entry + dotValue))
}

function hash33(values) {
  const p = [values[0] * 0.1031, values[1] * 0.103, values[2] * 0.0973].map(fract)
  const dotValue = p[0] * (p[1] + 33.33) + p[1] * (p[2] + 33.33) + p[2] * (p[0] + 33.33)
  const r = p.map((entry) => fract(entry + dotValue))

  return r.map((_, index) => fract((r[index % 3] + r[(index + 1) % 3]) * r[(index + 2) % 3]))
}

const vertex = `#version 300 es
precision highp float;
layout(location = 0) in vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`

const fragment = `#version 300 es
precision highp float;

uniform vec3 iResolution;
uniform float iTime;
uniform vec3 iMouse;
uniform vec3 iColor;
uniform vec3 iCursorColor;
uniform float iAnimationSize;
uniform int iBallCount;
uniform float iCursorBallSize;
uniform vec3 iMetaBalls[50];
uniform float iClumpFactor;
uniform bool enableTransparency;

out vec4 outColor;

float getMetaBallValue(vec2 c, float r, vec2 p) {
  vec2 d = p - c;
  float dist2 = dot(d, d);
  return (r * r) / dist2;
}

void main() {
  vec2 fc = gl_FragCoord.xy;
  float scale = iAnimationSize / iResolution.y;
  vec2 coord = (fc - iResolution.xy * 0.5) * scale;
  vec2 mouseW = (iMouse.xy - iResolution.xy * 0.5) * scale;

  float m1 = 0.0;
  for (int i = 0; i < 50; i++) {
    if (i >= iBallCount) break;
    m1 += getMetaBallValue(iMetaBalls[i].xy, iMetaBalls[i].z, coord);
  }

  float m2 = getMetaBallValue(mouseW, iCursorBallSize, coord);
  float total = m1 + m2;

  float f = smoothstep(-1.0, 1.0, (total - 1.3) / min(1.0, fwidth(total)));

  vec3 cFinal = vec3(0.0);
  if (total > 0.0) {
    float alpha1 = m1 / total;
    float alpha2 = m2 / total;
    cFinal = iColor * alpha1 + iCursorColor * alpha2;
  }

  outColor = vec4(cFinal * f, enableTransparency ? f : 1.0);
}
`

let cleanupAnimation = () => {}

function setupAnimation() {
  const container = containerRef.value
  if (!container) {
    return
  }

  const dpr = Math.min(window.devicePixelRatio || 1, 2)
  const renderer = new Renderer({ dpr, alpha: true, premultipliedAlpha: false })
  const gl = renderer.gl
  gl.clearColor(0, 0, 0, props.enableTransparency ? 0 : 1)
  container.appendChild(gl.canvas)

  const camera = new Camera(gl, {
    left: -1,
    right: 1,
    top: 1,
    bottom: -1,
    near: 0.1,
    far: 10,
  })
  camera.position.z = 1

  const geometry = new Triangle(gl)
  const [r1, g1, b1] = parseHexColor(props.color)
  const [r2, g2, b2] = parseHexColor(props.cursorBallColor)
  const metaBallsUniform = Array.from({ length: 50 }, () => new Vec3())

  const program = new Program(gl, {
    vertex,
    fragment,
    uniforms: {
      iTime: { value: 0 },
      iResolution: { value: new Vec3() },
      iMouse: { value: new Vec3() },
      iColor: { value: new Vec3(r1, g1, b1) },
      iCursorColor: { value: new Vec3(r2, g2, b2) },
      iAnimationSize: { value: props.animationSize },
      iBallCount: { value: props.ballCount },
      iCursorBallSize: { value: props.cursorBallSize },
      iMetaBalls: { value: metaBallsUniform },
      iClumpFactor: { value: props.clumpFactor },
      enableTransparency: { value: props.enableTransparency },
    },
  })

  const mesh = new Mesh(gl, { geometry, program })
  mesh.setParent(new Transform())

  const effectiveBallCount = Math.min(props.ballCount, 50)
  const ballParams = Array.from({ length: effectiveBallCount }, (_, index) => {
    const h1 = hash31(index + 1)
    const h2 = hash33(h1)

    return {
      st: h1[0] * 2 * Math.PI,
      dtFactor: 0.1 * Math.PI + h1[1] * (0.3 * Math.PI),
      baseScale: 5 + h1[1] * 5,
      toggle: Math.floor(h2[0] * 2),
      radius: 0.5 + h2[2] * 1.5,
    }
  })

  const mouseBallPos = { x: 0, y: 0 }
  let pointerInside = false
  let pointerX = 0
  let pointerY = 0

  const resize = () => {
    const { clientWidth, clientHeight } = container
    renderer.setSize(clientWidth * dpr, clientHeight * dpr)
    gl.canvas.style.width = `${clientWidth}px`
    gl.canvas.style.height = `${clientHeight}px`
    program.uniforms.iResolution.value.set(gl.canvas.width, gl.canvas.height, 0)
  }

  const handlePointerMove = (event) => {
    if (!props.enableMouseInteraction) {
      return
    }

    const rect = container.getBoundingClientRect()
    pointerX = ((event.clientX - rect.left) / rect.width) * gl.canvas.width
    pointerY = (1 - (event.clientY - rect.top) / rect.height) * gl.canvas.height
  }

  const handlePointerEnter = () => {
    pointerInside = true
  }

  const handlePointerLeave = () => {
    pointerInside = false
  }

  window.addEventListener('resize', resize)
  container.addEventListener('pointermove', handlePointerMove)
  container.addEventListener('pointerenter', handlePointerEnter)
  container.addEventListener('pointerleave', handlePointerLeave)

  resize()

  const startTime = performance.now()
  let animationFrameId = 0

  const update = (time) => {
    animationFrameId = window.requestAnimationFrame(update)
    const elapsed = (time - startTime) * 0.001
    program.uniforms.iTime.value = elapsed

    for (let index = 0; index < effectiveBallCount; index += 1) {
      const { st, dtFactor, baseScale, toggle, radius } = ballParams[index]
      const dt = elapsed * props.speed * dtFactor
      const angle = st + dt
      const x = Math.cos(angle)
      const y = Math.sin(angle + dt * toggle)

      metaBallsUniform[index].set(x * baseScale * props.clumpFactor, y * baseScale * props.clumpFactor, radius)
    }

    const targetX = pointerInside
      ? pointerX
      : gl.canvas.width * 0.5 + Math.cos(elapsed * props.speed) * gl.canvas.width * 0.15
    const targetY = pointerInside
      ? pointerY
      : gl.canvas.height * 0.5 + Math.sin(elapsed * props.speed) * gl.canvas.height * 0.15

    mouseBallPos.x += (targetX - mouseBallPos.x) * props.hoverSmoothness
    mouseBallPos.y += (targetY - mouseBallPos.y) * props.hoverSmoothness
    program.uniforms.iMouse.value.set(mouseBallPos.x, mouseBallPos.y, 0)

    renderer.render({ scene: mesh.parent, camera })
  }

  animationFrameId = window.requestAnimationFrame(update)

  cleanupAnimation = () => {
    window.cancelAnimationFrame(animationFrameId)
    window.removeEventListener('resize', resize)
    container.removeEventListener('pointermove', handlePointerMove)
    container.removeEventListener('pointerenter', handlePointerEnter)
    container.removeEventListener('pointerleave', handlePointerLeave)
    gl.getExtension('WEBGL_lose_context')?.loseContext()

    if (container.contains(gl.canvas)) {
      container.removeChild(gl.canvas)
    }
  }
}

onMounted(setupAnimation)
onUnmounted(() => cleanupAnimation())

watch(
  props,
  () => {
    cleanupAnimation()
    setupAnimation()
  },
  { deep: true },
)
</script>

<template>
  <div ref="containerRef" class="meta-balls-host" :style="{ mixBlendMode: props.mixBlendMode }" />
</template>
