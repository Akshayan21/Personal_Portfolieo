/**
 * Three.js Scroll-Driven 3D Background — LIGHT THEME
 * Cream background (#f5f0e8) with dark wireframes and subtle neon accents.
 * Canvas is transparent; the body cream color shows through.
 */
import * as THREE from 'three';

// ─── LIGHT-THEME PALETTE ─────────────────────────────────
const C = {
  dark:    0x0a0a0a,   // deep black — wireframe lines
  grey:    0x888888,   // mid grey
  ltGrey:  0xcccccc,   // light grey for subtle geo
  green:   0x7ab83c,   // muted neon green
  pink:    0xff3c78,   // neon pink
  blue:    0x4d7cff,   // neon blue
  yellow:  0xffe14d,   // neon yellow
};

// ─── ENGINE ──────────────────────────────────────────────
let renderer: THREE.WebGLRenderer;
let scene: THREE.Scene;
let camera: THREE.PerspectiveCamera;
let clock: THREE.Clock;
let scrollY = 0;
let smoothScroll = 0;

const groups: THREE.Group[] = [];

function init() {
  // Feature detect
  const tc = document.createElement('canvas');
  if (!(tc.getContext('webgl') || tc.getContext('experimental-webgl'))) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  // Canvas — transparent so cream body shows through
  const canvas = document.createElement('canvas');
  canvas.id = 'three-bg';
  canvas.style.cssText = 'position:fixed;top:0;left:0;width:100vw;height:100vh;z-index:0;pointer-events:none;';
  document.body.prepend(canvas);

  renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x000000, 0);

  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 400);
  camera.position.set(0, 0, 22);

  clock = new THREE.Clock();

  // Build scenes per section
  buildHero();
  buildAbout();
  buildExperience();
  buildSkills();
  buildPhilosophy();
  buildContact();

  window.addEventListener('resize', onResize);
  window.addEventListener('scroll', () => { scrollY = window.scrollY; }, { passive: true });

  animate();
}

// ─── HERO: Scattered wireframe octahedrons ───────────────
function buildHero() {
  const g = new THREE.Group();

  // Central rotating shape
  const coreGeo = new THREE.IcosahedronGeometry(4, 1);
  const coreMat = new THREE.MeshBasicMaterial({ color: C.dark, wireframe: true, transparent: true, opacity: 0.04 });
  g.add(new THREE.Mesh(coreGeo, coreMat));

  // Scattered shards
  for (let i = 0; i < 18; i++) {
    const size = 0.2 + Math.random() * 0.5;
    const geo = new THREE.OctahedronGeometry(size, 0);
    const colors = [C.dark, C.grey, C.green, C.blue];
    const mat = new THREE.MeshBasicMaterial({
      color: colors[i % 4],
      wireframe: true,
      transparent: true,
      opacity: 0.04 + Math.random() * 0.06,
    });
    const m = new THREE.Mesh(geo, mat);
    m.position.set((Math.random() - 0.5) * 24, (Math.random() - 0.5) * 16, (Math.random() - 0.5) * 10);
    m.userData = { spd: 0.2 + Math.random() * 0.4, off: Math.random() * 6.28 };
    g.add(m);
  }

  g.position.z = 0;
  scene.add(g);
  groups.push(g);
}

// ─── ABOUT: Grid floor with rising dots ──────────────────
function buildAbout() {
  const g = new THREE.Group();

  const grid = new THREE.GridHelper(28, 28, C.dark, C.ltGrey);
  grid.position.y = -5;
  (grid.material as THREE.Material).transparent = true;
  (grid.material as THREE.Material).opacity = 0.04;
  g.add(grid);

  // Rising dots
  const count = 200;
  const pos = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    pos[i * 3]     = (Math.random() - 0.5) * 22;
    pos[i * 3 + 1] = Math.random() * 18 - 5;
    pos[i * 3 + 2] = (Math.random() - 0.5) * 12;
  }
  const pGeo = new THREE.BufferGeometry();
  pGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  const pMat = new THREE.PointsMaterial({ color: C.dark, size: 0.04, transparent: true, opacity: 0.12 });
  g.add(new THREE.Points(pGeo, pMat));

  g.position.z = -30;
  scene.add(g);
  groups.push(g);
}

// ─── EXPERIENCE: Rising pillars ──────────────────────────
function buildExperience() {
  const g = new THREE.Group();
  const heights = [2, 3.5, 5.5, 7, 9];

  for (let i = 0; i < heights.length; i++) {
    const geo = new THREE.BoxGeometry(0.8, heights[i], 0.8);
    const mat = new THREE.MeshBasicMaterial({
      color: i % 2 === 0 ? C.dark : C.green,
      wireframe: true,
      transparent: true,
      opacity: 0.06,
    });
    const m = new THREE.Mesh(geo, mat);
    m.position.set((i - 2) * 3.5, heights[i] / 2 - 5, 0);
    g.add(m);
  }

  // Connecting lines
  const lMat = new THREE.LineBasicMaterial({ color: C.dark, transparent: true, opacity: 0.04 });
  for (let i = 0; i < heights.length - 1; i++) {
    const pts = [
      new THREE.Vector3((i - 2) * 3.5, heights[i] - 5, 0),
      new THREE.Vector3((i - 1) * 3.5, heights[i + 1] - 5, 0),
    ];
    g.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), lMat));
  }

  g.position.z = -60;
  scene.add(g);
  groups.push(g);
}

// ─── SKILLS: Orbiting clusters + wireframe torus ─────────
function buildSkills() {
  const g = new THREE.Group();
  const clrPalette = [C.dark, C.blue, C.pink, C.green];

  for (let c = 0; c < 4; c++) {
    const n = 60;
    const pos = new Float32Array(n * 3);
    const cx = (Math.random() - 0.5) * 10;
    const cy = (Math.random() - 0.5) * 7;
    for (let i = 0; i < n; i++) {
      pos[i * 3]     = cx + (Math.random() - 0.5) * 5;
      pos[i * 3 + 1] = cy + (Math.random() - 0.5) * 5;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 3;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    g.add(new THREE.Points(geo, new THREE.PointsMaterial({
      color: clrPalette[c], size: 0.06, transparent: true, opacity: 0.12,
    })));
  }

  // Torus
  const tGeo = new THREE.TorusGeometry(2.5, 0.6, 8, 16);
  g.add(new THREE.Mesh(tGeo, new THREE.MeshBasicMaterial({
    color: C.dark, wireframe: true, transparent: true, opacity: 0.035,
  })));

  g.position.z = -90;
  scene.add(g);
  groups.push(g);
}

// ─── PHILOSOPHY: Flowing curve with nodes ────────────────
function buildPhilosophy() {
  const g = new THREE.Group();

  const pts = [
    new THREE.Vector3(-9, 0, 0),
    new THREE.Vector3(-4, 3, -2),
    new THREE.Vector3(0, -1, 1),
    new THREE.Vector3(4, 2, -1),
    new THREE.Vector3(9, 0, 0),
  ];
  const curve = new THREE.CatmullRomCurve3(pts);
  g.add(new THREE.Line(
    new THREE.BufferGeometry().setFromPoints(curve.getPoints(80)),
    new THREE.LineBasicMaterial({ color: C.dark, transparent: true, opacity: 0.06 })
  ));

  for (const p of pts) {
    const nGeo = new THREE.DodecahedronGeometry(0.4, 0);
    const n = new THREE.Mesh(nGeo, new THREE.MeshBasicMaterial({
      color: C.blue, wireframe: true, transparent: true, opacity: 0.1,
    }));
    n.position.copy(p);
    g.add(n);
  }

  g.position.z = -120;
  scene.add(g);
  groups.push(g);
}

// ─── CONTACT: Converging lines + pulsing center ──────────
function buildContact() {
  const g = new THREE.Group();

  const lMat = new THREE.LineBasicMaterial({ color: C.dark, transparent: true, opacity: 0.04 });
  for (let i = 0; i < 14; i++) {
    const a = (i / 14) * Math.PI * 2;
    g.add(new THREE.Line(
      new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(Math.cos(a) * 14, Math.sin(a) * 9, -2),
        new THREE.Vector3(0, 0, 0),
      ]),
      lMat.clone()
    ));
  }

  // Center
  const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 12, 12),
    new THREE.MeshBasicMaterial({ color: C.green, transparent: true, opacity: 0.15 })
  );
  sphere.userData.isCenter = true;
  g.add(sphere);

  // Ring
  g.add(new THREE.Mesh(
    new THREE.RingGeometry(3.5, 3.6, 48),
    new THREE.MeshBasicMaterial({ color: C.dark, side: THREE.DoubleSide, transparent: true, opacity: 0.04 })
  ));

  g.position.z = -150;
  scene.add(g);
  groups.push(g);
}

// ─── VISIBILITY ──────────────────────────────────────────
function vis(idx: number, progress: number, total: number): number {
  const sz = 1 / total;
  const start = idx * sz;
  const end = (idx + 1) * sz;
  const fade = sz * 0.3;

  if (progress < start - fade || progress > end + fade) return 0;
  if (progress < start + fade) return Math.max(0, (progress - (start - fade)) / (fade * 2));
  if (progress > end - fade) return Math.max(0, ((end + fade) - progress) / (fade * 2));
  return 1;
}

// ─── ANIMATE ─────────────────────────────────────────────
function animate() {
  requestAnimationFrame(animate);

  const t = clock.getElapsedTime();
  const docH = document.documentElement.scrollHeight - window.innerHeight;
  const target = docH > 0 ? Math.min(scrollY / docH, 1) : 0;
  smoothScroll += (target - smoothScroll) * 0.05;

  // Camera path
  const cz = 22 - smoothScroll * 172;
  const wx = Math.sin(smoothScroll * Math.PI * 2) * 1.2;
  const wy = Math.cos(smoothScroll * Math.PI * 3) * 0.6;
  camera.position.set(wx, wy, cz);
  camera.lookAt(wx * 0.2, wy * 0.2, cz - 14);

  const n = groups.length;
  for (let i = 0; i < n; i++) {
    const grp = groups[i];
    const v = vis(i, smoothScroll, n);
    grp.visible = v > 0.003;

    grp.traverse((child) => {
      if ((child instanceof THREE.Mesh || child instanceof THREE.Points) && child.material instanceof THREE.Material) {
        if (child.userData.baseOp === undefined) child.userData.baseOp = (child.material as any).opacity;
        (child.material as any).opacity = child.userData.baseOp * v;
      }
    });

    if (!grp.visible) continue;

    // Per-scene animation
    if (i === 0) {
      grp.children.forEach((c, ci) => {
        if (c instanceof THREE.Mesh) {
          if (ci === 0) { c.rotation.x = t * 0.08; c.rotation.y = t * 0.1; }
          else {
            const s = c.userData.spd || 0.3;
            c.rotation.x += 0.002 * s;
            c.rotation.y += 0.003 * s;
            c.position.y += Math.sin(t * s + (c.userData.off || 0)) * 0.003;
          }
        }
      });
    } else if (i === 1) {
      grp.children.forEach(c => {
        if (c instanceof THREE.Points) {
          const pos = c.geometry.attributes.position;
          for (let p = 0; p < pos.count; p++) {
            let y = pos.getY(p);
            y += 0.006;
            if (y > 13) y = -5;
            pos.setY(p, y);
          }
          pos.needsUpdate = true;
        }
      });
    } else if (i === 2) {
      grp.children.forEach(c => {
        if (c instanceof THREE.Mesh) c.position.y += Math.sin(t + c.position.x) * 0.002;
      });
    } else if (i === 3) {
      grp.children.forEach((c, ci) => {
        if (c instanceof THREE.Points) {
          c.rotation.y = t * 0.06 * (ci % 2 === 0 ? 1 : -1);
        }
        if (c instanceof THREE.Mesh) { c.rotation.x = t * 0.15; c.rotation.y = t * 0.2; }
      });
    } else if (i === 4) {
      grp.children.forEach(c => {
        if (c instanceof THREE.Mesh) { c.rotation.y = t * 0.4; c.rotation.x = t * 0.25; }
      });
    } else if (i === 5) {
      grp.rotation.z = t * 0.04;
      grp.children.forEach(c => {
        if (c instanceof THREE.Mesh && c.userData.isCenter) c.scale.setScalar(1 + Math.sin(t * 1.8) * 0.12);
      });
    }
  }

  renderer.render(scene, camera);
}

function onResize() {
  if (!renderer) return;
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

// ─── START ───────────────────────────────────────────────
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
