/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        forge: {
          bg: "#070A12",
          navy: "#040a13",
          dark: "#0A0E27",
          accent: "#00D4FF",
          brightCyan: "#7df9ff",
          text: "#F7FAFC",
          muted: "#8D96A8",
          surface: "#101522",
          surfaceHover: "#161D2E",
          border: "rgba(255, 255, 255, 0.10)",
          borderHover: "rgba(0, 212, 255, 0.35)",
          glow: "rgba(0, 212, 255, 0.25)",
        },
      },
      fontFamily: {
        orbitron: ['"Orbitron"', 'sans-serif'],
        display: ['"Space Grotesk"', 'sans-serif'],
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        'cyan-glow': '0 0 25px rgba(0, 212, 255, 0.25)',
        'cyan-glow-lg': '0 0 50px rgba(0, 212, 255, 0.3)',
        'inner-subtle': 'inset 0 1px 1px 0 rgba(255, 255, 255, 0.08)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'marquee': 'marquee 30s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
}
