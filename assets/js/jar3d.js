/* Real 3D product viewer (Three.js, ES module).
   Loads a .glb model, overlays the product label onto its front face, and spins it.
   initJar3D(container, { model, label, fallback, spin }) is exposed on window.
   Falls back to a static image if WebGL fails. */
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

const DEFAULTS = {
  model: "assets/3D-model/Home_2K_00002_.glb",
  label: "assets/img/products/khing-dong/khing-dong-label.jpg",
  fallback: "assets/img/products/khing-dong/khing-dong-nobackground.png",
  spin: true
};

// Soft studio environment (equirectangular gradient) -> PMREM, for PBR reflections.
function studioEnv(renderer) {
  const c = document.createElement("canvas");
  c.width = 512; c.height = 256;
  const ctx = c.getContext("2d");
  const g = ctx.createLinearGradient(0, 0, 0, 256);
  g.addColorStop(0, "#ffffff"); g.addColorStop(0.45, "#dfe5e8");
  g.addColorStop(0.7, "#aab0b4"); g.addColorStop(1, "#595d61");
  ctx.fillStyle = g; ctx.fillRect(0, 0, 512, 256);
  ctx.fillStyle = "rgba(255,255,255,0.95)"; ctx.fillRect(70, 35, 120, 60);
  ctx.fillStyle = "rgba(255,245,220,0.7)"; ctx.fillRect(330, 50, 90, 45);
  const tex = new THREE.CanvasTexture(c);
  tex.mapping = THREE.EquirectangularReflectionMapping;
  const pmrem = new THREE.PMREMGenerator(renderer);
  const env = pmrem.fromEquirectangular(tex).texture;
  pmrem.dispose(); tex.dispose();
  return env;
}

function build(container, opts) {
  const w = container.clientWidth || 300;
  const h = container.clientHeight || 300;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(w, h);
  renderer.setClearColor(0x000000, 0);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.1;
  container.appendChild(renderer.domElement);
  const aniso = renderer.capabilities.getMaxAnisotropy();

  const scene = new THREE.Scene();
  scene.environment = studioEnv(renderer);

  const camera = new THREE.PerspectiveCamera(32, w / h, 0.1, 100);
  camera.position.set(0, 0.1, 3.4);

  scene.add(new THREE.AmbientLight(0xffffff, 0.35));
  const key = new THREE.DirectionalLight(0xffffff, 1.4); key.position.set(3, 5, 4); scene.add(key);
  const fill = new THREE.DirectionalLight(0xffe9c0, 0.5); fill.position.set(-4, 1.5, 2); scene.add(fill);

  const group = new THREE.Group();
  scene.add(group);

  new GLTFLoader().load(opts.model, (gltf) => {
    const model = gltf.scene;

    // centre + scale to a consistent height
    const box = new THREE.Box3().setFromObject(model);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    const targetH = 2.0;
    const s = targetH / (size.y || 1);
    model.scale.setScalar(s);
    model.position.set(-center.x * s, -center.y * s, -center.z * s);
    // pivot lets us turn the model's labelled face toward the viewer (+Z)
    const pivot = new THREE.Group();
    pivot.rotation.y = Math.PI;
    pivot.add(model);
    group.add(pivot);

    // label overlay on the front (+Z) face
    if (opts.label) {
      const sx = size.x * s, sy = size.y * s, sz = size.z * s;
      const tex = new THREE.TextureLoader().load(opts.label, () => renderer.render(scene, camera));
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.anisotropy = aniso;
      const lw = sx * 0.55;            // label ~55% of model width
      const lh = lw / 0.895;           // label image aspect (340x380)
      const label = new THREE.Mesh(
        new THREE.PlaneGeometry(lw, lh),
        new THREE.MeshStandardMaterial({ map: tex, roughness: 0.8, metalness: 0, transparent: true })
      );
      label.position.set(0, -sy * 0.04, sz * 0.5 + 0.004);
      group.add(label);
      container._jarLabel = label; // exposed for easy repositioning if needed
    }

    renderer.render(scene, camera);
    const poster = container.querySelector(".mk-jar-poster"); // remove the 2D placeholder
    if (poster) poster.remove();
  }, undefined, () => {
    // keep the poster image visible if the model fails to load
  });

  let raf;
  const tick = () => {
    if (opts.spin) group.rotation.y += 0.008;
    renderer.render(scene, camera);
    raf = requestAnimationFrame(tick);
  };
  tick();

  const ro = new ResizeObserver(() => {
    const cw = container.clientWidth, ch = container.clientHeight;
    if (!cw || !ch) return;
    camera.aspect = cw / ch; camera.updateProjectionMatrix();
    renderer.setSize(cw, ch);
  });
  ro.observe(container);

  container._jar3d = { stop: () => { cancelAnimationFrame(raf); ro.disconnect(); renderer.dispose(); } };
}

window.initJar3D = function (container, options) {
  if (!container || container.dataset.jar3dReady) return;
  const opts = Object.assign({}, DEFAULTS, options || {});
  if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) opts.spin = false;
  container.dataset.jar3dReady = "1";
  try {
    build(container, opts);
  } catch (e) {
    container.innerHTML = `<img src="${opts.fallback}" alt="" style="width:100%;height:100%;object-fit:contain" />`;
  }
};

// This is a module (deferred): the DOM is ready, so mount any jars already present.
function autoMount() {
  document.querySelectorAll("[data-jar3d]").forEach((el) =>
    window.initJar3D(el, { model: el.dataset.model || undefined, label: el.dataset.label || undefined, fallback: el.dataset.fallback || undefined }));
}
if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", autoMount);
else autoMount();
