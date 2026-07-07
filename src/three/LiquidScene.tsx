import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * A purple "laboratory liquid" blob: a high-detail icosahedron displaced by
 * simplex noise in the vertex shader, with a fresnel rim glow and an
 * orbiting particle field. Reacts to mouse + scroll. Degrades gracefully
 * on mobile and honors prefers-reduced-motion.
 */

const vertexShader = /* glsl */ `
uniform float uTime;
uniform float uAmp;
uniform vec3 uMouse;
varying vec3 vNormal;
varying vec3 vViewPosition;
varying float vDisp;

// --- Ashima simplex noise (snoise) ---
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
  float t = uTime * 0.35;
  float n = snoise(normal * 1.3 + t);
  n += 0.5 * snoise(normal * 2.6 - t * 1.4);
  float mouseInfluence = 0.35 * snoise(normal * 2.0 + uMouse * 2.0);
  float disp = (n + mouseInfluence) * uAmp;
  vDisp = disp;
  vec3 newPos = position + normal * disp;
  vec4 mvPosition = modelViewMatrix * vec4(newPos, 1.0);
  vViewPosition = -mvPosition.xyz;
  gl_Position = projectionMatrix * mvPosition;
}
`;

const fragmentShader = /* glsl */ `
uniform float uTime;
varying vec3 vNormal;
varying vec3 vViewPosition;
varying float vDisp;

void main(){
  vec3 viewDir = normalize(vViewPosition);
  float fresnel = pow(1.0 - max(dot(normalize(vNormal), viewDir), 0.0), 2.4);

  vec3 deep   = vec3(0.16, 0.03, 0.32);   // deep violet core
  vec3 violet = vec3(0.54, 0.18, 0.90);   // core violet
  vec3 magenta= vec3(1.00, 0.30, 0.94);   // magenta glow
  vec3 spark  = vec3(0.79, 1.00, 0.24);   // faint toxic-lime lab spark

  float mixv = smoothstep(-0.4, 0.6, vDisp);
  vec3 base = mix(deep, violet, mixv);
  base = mix(base, magenta, fresnel);
  base += spark * pow(fresnel, 5.0) * 0.25;
  base += violet * (0.15 + 0.1 * sin(uTime + vDisp * 6.0));

  gl_FragColor = vec4(base, 1.0);
}
`;

export default function LiquidScene() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.innerWidth < 768;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      mount.clientWidth / mount.clientHeight,
      0.1,
      100
    );
    camera.position.z = 5.7;

    const renderer = new THREE.WebGLRenderer({
      antialias: !isMobile,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    // Blob
    const detail = isMobile ? 24 : 48;
    const geometry = new THREE.IcosahedronGeometry(1.35, detail);
    const uniforms = {
      uTime: { value: 0 },
      uAmp: { value: 0.42 },
      uMouse: { value: new THREE.Vector3() },
    };
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
    });
    const blob = new THREE.Mesh(geometry, material);
    scene.add(blob);

    // Inner glow core
    const glowGeo = new THREE.SphereGeometry(1.1, 32, 32);
    const glowMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color("#e935c1"),
      transparent: true,
      opacity: 0.14,
    });
    const glow = new THREE.Mesh(glowGeo, glowMat);
    scene.add(glow);

    // Particle field
    const pCount = isMobile ? 350 : 900;
    const positions = new Float32Array(pCount * 3);
    for (let i = 0; i < pCount; i++) {
      const r = 2.4 + Math.random() * 3.2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const pMat = new THREE.PointsMaterial({
      color: new THREE.Color("#c084fc"),
      size: 0.028,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const particles = new THREE.Points(pGeo, pMat);
    scene.add(particles);

    // Interaction state
    const mouse = { x: 0, y: 0 };
    const targetMouse = { x: 0, y: 0 };
    let scrollN = 0;

    const onPointer = (e: PointerEvent) => {
      targetMouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      targetMouse.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    const onScroll = () => {
      const max = window.innerHeight * 1.5;
      scrollN = Math.min(window.scrollY / max, 1);
    };
    window.addEventListener("pointermove", onPointer, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });

    const onResize = () => {
      if (!mount) return;
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener("resize", onResize);

    const clock = new THREE.Clock();
    let raf = 0;

    const render = () => {
      const t = clock.getElapsedTime();
      mouse.x += (targetMouse.x - mouse.x) * 0.05;
      mouse.y += (targetMouse.y - mouse.y) * 0.05;

      if (!reduced) {
        uniforms.uTime.value = t;
        uniforms.uMouse.value.set(mouse.x, mouse.y, Math.sin(t * 0.2));
        blob.rotation.y = t * 0.12 + mouse.x * 0.4;
        blob.rotation.x = mouse.y * 0.3 + scrollN * 0.6;
        blob.position.y = scrollN * -0.6;
        glow.position.copy(blob.position);
        const s = 1 - scrollN * 0.25;
        blob.scale.setScalar(s);
        glow.scale.setScalar(s);
        particles.rotation.y = t * 0.03;
        particles.rotation.x = mouse.y * 0.1;
        camera.position.x += (mouse.x * 0.4 - camera.position.x) * 0.05;
        camera.lookAt(0, blob.position.y, 0);
      } else {
        uniforms.uTime.value = 0.5;
      }

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
      pGeo.dispose();
      pMat.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0 h-full w-full" aria-hidden="true" />;
}
