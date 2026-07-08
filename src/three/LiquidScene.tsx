import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Fixed full-viewport "laboratory liquid" background. A noise-displaced blob
 * weaves across the screen as the user scrolls (so it travels through the whole
 * site), surrounded by a drifting, parallaxing starfield. Always animated;
 * only quality/quantity scales down on mobile.
 */

const vertexShader = /* glsl */ `
uniform float uTime;
uniform float uAmp;
uniform float uScroll;
uniform vec3 uMouse;
varying vec3 vNormal;
varying vec3 vViewPosition;
varying float vDisp;

vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x,289.0);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}
float snoise(vec3 v){
  const vec2 C=vec2(1.0/6.0,1.0/3.0);
  const vec4 D=vec4(0.0,0.5,1.0,2.0);
  vec3 i=floor(v+dot(v,C.yyy));
  vec3 x0=v-i+dot(i,C.xxx);
  vec3 g=step(x0.yzx,x0.xyz);
  vec3 l=1.0-g;
  vec3 i1=min(g.xyz,l.zxy);
  vec3 i2=max(g.xyz,l.zxy);
  vec3 x1=x0-i1+C.xxx;
  vec3 x2=x0-i2+C.yyy;
  vec3 x3=x0-D.yyy;
  i=mod(i,289.0);
  vec4 p=permute(permute(permute(
      i.z+vec4(0.0,i1.z,i2.z,1.0))
    + i.y+vec4(0.0,i1.y,i2.y,1.0))
    + i.x+vec4(0.0,i1.x,i2.x,1.0));
  float n_=1.0/7.0;
  vec3 ns=n_*D.wyz-D.xzx;
  vec4 j=p-49.0*floor(p*ns.z*ns.z);
  vec4 x_=floor(j*ns.z);
  vec4 y_=floor(j-7.0*x_);
  vec4 x=x_*ns.x+ns.yyyy;
  vec4 y=y_*ns.x+ns.yyyy;
  vec4 h=1.0-abs(x)-abs(y);
  vec4 b0=vec4(x.xy,y.xy);
  vec4 b1=vec4(x.zw,y.zw);
  vec4 s0=floor(b0)*2.0+1.0;
  vec4 s1=floor(b1)*2.0+1.0;
  vec4 sh=-step(h,vec4(0.0));
  vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;
  vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
  vec3 p0=vec3(a0.xy,h.x);
  vec3 p1=vec3(a0.zw,h.y);
  vec3 p2=vec3(a1.xy,h.z);
  vec3 p3=vec3(a1.zw,h.w);
  vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
  p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
  vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0);
  m=m*m;
  return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
}

void main(){
  vNormal = normalize(normalMatrix * normal);
  float t = uTime * 0.4;
  float freq = 1.25 + uScroll * 1.4;
  float n = snoise(normal * freq + t);
  n += 0.5 * snoise(normal * (2.6 + uScroll * 1.6) - t * 1.3);
  float mouseInfluence = 0.4 * snoise(normal * 2.0 + uMouse * 2.0);
  float disp = (n + mouseInfluence) * (uAmp + uScroll * 0.35);
  vDisp = disp;
  vec3 newPos = position + normal * disp;
  vec4 mvPosition = modelViewMatrix * vec4(newPos, 1.0);
  vViewPosition = -mvPosition.xyz;
  gl_Position = projectionMatrix * mvPosition;
}
`;

const fragmentShader = /* glsl */ `
uniform float uTime;
uniform float uScroll;
uniform float uHue;
varying vec3 vNormal;
varying vec3 vViewPosition;
varying float vDisp;

void main(){
  vec3 viewDir = normalize(vViewPosition);
  float fresnel = pow(1.0 - max(dot(normalize(vNormal), viewDir), 0.0), 2.2);

  vec3 deep   = vec3(0.14, 0.02, 0.30);
  vec3 violet = vec3(0.52, 0.16, 0.90);
  vec3 magenta= vec3(1.00, 0.28, 0.94);
  vec3 spark  = vec3(0.79, 1.00, 0.24);

  float mixv = smoothstep(-0.4, 0.6, vDisp);
  vec3 base = mix(deep, violet, mixv);
  base = mix(base, magenta, clamp(fresnel + uHue * 0.4, 0.0, 1.0));
  base += spark * pow(fresnel, 5.0) * 0.22;
  base += violet * (0.12 + 0.10 * sin(uTime + vDisp * 6.0));

  gl_FragColor = vec4(base, 1.0);
}
`;

function makeStarTexture() {
  const c = document.createElement("canvas");
  c.width = c.height = 64;
  const ctx = c.getContext("2d")!;
  const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  g.addColorStop(0, "rgba(255,255,255,1)");
  g.addColorStop(0.25, "rgba(226,200,255,0.9)");
  g.addColorStop(1, "rgba(168,85,247,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 64, 64);
  const tex = new THREE.CanvasTexture(c);
  return tex;
}

export default function LiquidScene() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    const isMobile = window.innerWidth < 768;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.z = 7;

    const renderer = new THREE.WebGLRenderer({
      antialias: !isMobile,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    mount.appendChild(renderer.domElement);

    // Blob
    const detail = isMobile ? 20 : 44;
    const geometry = new THREE.IcosahedronGeometry(1.25, detail);
    const uniforms = {
      uTime: { value: 0 },
      uAmp: { value: 0.44 },
      uScroll: { value: 0 },
      uHue: { value: 0 },
      uMouse: { value: new THREE.Vector3() },
    };
    const material = new THREE.ShaderMaterial({ vertexShader, fragmentShader, uniforms });
    const blob = new THREE.Mesh(geometry, material);
    scene.add(blob);

    const glowGeo = new THREE.SphereGeometry(1.0, 32, 32);
    const glowMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color("#e935c1"),
      transparent: true,
      opacity: 0.14,
    });
    const glow = new THREE.Mesh(glowGeo, glowMat);
    scene.add(glow);

    // Starfield (drifting, parallaxing)
    const starTex = makeStarTexture();
    const makeStars = (count: number, spread: number, size: number, color: string, opacity: number) => {
      const pos = new Float32Array(count * 3);
      for (let i = 0; i < count; i++) {
        pos[i * 3] = (Math.random() - 0.5) * spread;
        pos[i * 3 + 1] = (Math.random() - 0.5) * spread;
        pos[i * 3 + 2] = (Math.random() - 0.5) * spread * 0.6 - 3;
      }
      const g = new THREE.BufferGeometry();
      g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
      const m = new THREE.PointsMaterial({
        size,
        map: starTex,
        color: new THREE.Color(color),
        transparent: true,
        opacity,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        sizeAttenuation: true,
      });
      return new THREE.Points(g, m);
    };
    const starsFar = makeStars(isMobile ? 240 : 520, 26, 0.10, "#b892ff", 0.65);
    const starsNear = makeStars(isMobile ? 120 : 260, 18, 0.16, "#ff9bf0", 0.8);
    scene.add(starsFar, starsNear);

    // Interaction state
    const mouse = { x: 0, y: 0 };
    const targetMouse = { x: 0, y: 0 };
    let scrollN = 0;

    const onPointer = (e: PointerEvent) => {
      targetMouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      targetMouse.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      scrollN = max > 0 ? Math.min(Math.max(window.scrollY / max, 0), 1) : 0;
    };
    onScroll();
    window.addEventListener("pointermove", onPointer, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onResize);

    const clock = new THREE.Clock();
    let raf = 0;
    let smoothScroll = scrollN;

    const render = () => {
      const t = clock.getElapsedTime();
      mouse.x += (targetMouse.x - mouse.x) * 0.05;
      mouse.y += (targetMouse.y - mouse.y) * 0.05;
      smoothScroll += (scrollN - smoothScroll) * 0.07;
      const p = smoothScroll;

      uniforms.uTime.value = t;
      uniforms.uScroll.value = p;
      uniforms.uHue.value = p;
      uniforms.uMouse.value.set(mouse.x, mouse.y, Math.sin(t * 0.2));

      // Weaving path across the viewport as you scroll -> travels through the site
      const weaveX = Math.sin(p * Math.PI * 3.0) * 2.4;
      const weaveY = Math.cos(p * Math.PI * 2.0) * 0.5 - p * 0.3;
      blob.position.x += (weaveX + mouse.x * 0.5 - blob.position.x) * 0.06;
      blob.position.y += (weaveY + mouse.y * 0.3 - blob.position.y) * 0.06;
      blob.rotation.y = t * 0.16 + p * 3.0;
      blob.rotation.x = t * 0.05 + p * 1.2;
      const s = 1 + Math.sin(p * Math.PI) * 0.12;
      blob.scale.setScalar(s);
      glow.position.copy(blob.position);
      glow.scale.setScalar(s * 1.05);
      glowMat.opacity = 0.12 + p * 0.12;

      // Star drift + scroll parallax
      starsFar.rotation.z = t * 0.01;
      starsFar.position.y = p * 3.2;
      starsFar.position.x = -mouse.x * 0.4;
      starsNear.rotation.z = -t * 0.016;
      starsNear.position.y = p * 6.0;
      starsNear.position.x = -mouse.x * 0.9;

      renderer.render(scene, camera);
      raf = requestAnimationFrame(render);
    };
    render();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      geometry.dispose();
      material.dispose();
      glowGeo.dispose();
      glowMat.dispose();
      starsFar.geometry.dispose();
      (starsFar.material as THREE.Material).dispose();
      starsNear.geometry.dispose();
      (starsNear.material as THREE.Material).dispose();
      starTex.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0 h-full w-full" aria-hidden="true" />;
}
