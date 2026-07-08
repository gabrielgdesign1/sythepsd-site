/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          900: "#050310",
          800: "#0a0618",
          700: "#0f0a22",
          600: "#151030",
        },
        violet: {
          glow: "#a855f7",
          core: "#8b2fe6",
          deep: "#6d28d9",
        },
        magenta: {
          glow: "#ff4df0",
          core: "#e935c1",
        },
        toxic: "#c9ff3d",
        haze: "#f5f3ff",
      },
      fontFamily: {
        display: ['"Bricolage Grotesque"', "system-ui", "sans-serif"],
        sans: ['"Space Grotesk"', "system-ui", "sans-serif"],
      },
      letterSpacing: {
        tightest: "-0.05em",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        floaty: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
        orbit: {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        orbitReverse: {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(-360deg)" },
        },
        auroraShift: {
          "0%,100%": { transform: "translate3d(0,0,0) scale(1)" },
          "33%": { transform: "translate3d(6%,-4%,0) scale(1.15)" },
          "66%": { transform: "translate3d(-5%,5%,0) scale(0.95)" },
        },
      },
      animation: {
        marquee: "marquee 32s linear infinite",
        floaty: "floaty 6s ease-in-out infinite",
        orbit: "orbit 44s linear infinite",
        "orbit-reverse": "orbitReverse 44s linear infinite",
        aurora: "auroraShift 26s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
