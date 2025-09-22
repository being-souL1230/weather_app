import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./client/index.html", "./client/src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      borderRadius: {
        lg: ".5625rem", /* 9px */
        md: ".375rem", /* 6px */
        sm: ".1875rem", /* 3px */
      },
      colors: {
        // Flat / base colors (regular buttons)
        background: "hsl(var(--background) / <alpha-value>)",
        foreground: "hsl(var(--foreground) / <alpha-value>)",
        border: "hsl(var(--border) / <alpha-value>)",
        input: "hsl(var(--input) / <alpha-value>)",
        card: {
          DEFAULT: "hsl(var(--card) / <alpha-value>)",
          foreground: "hsl(var(--card-foreground) / <alpha-value>)",
          border: "hsl(var(--card-border) / <alpha-value>)",
        },
        popover: {
          DEFAULT: "hsl(var(--popover) / <alpha-value>)",
          foreground: "hsl(var(--popover-foreground) / <alpha-value>)",
          border: "hsl(var(--popover-border) / <alpha-value>)",
        },
        primary: {
          DEFAULT: "hsl(var(--primary) / <alpha-value>)",
          foreground: "hsl(var(--primary-foreground) / <alpha-value>)",
          border: "var(--primary-border)",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary) / <alpha-value>)",
          foreground: "hsl(var(--secondary-foreground) / <alpha-value>)",
          border: "var(--secondary-border)",
        },
        muted: {
          DEFAULT: "hsl(var(--muted) / <alpha-value>)",
          foreground: "hsl(var(--muted-foreground) / <alpha-value>)",
          border: "var(--muted-border)",
        },
        accent: {
          DEFAULT: "hsl(var(--accent) / <alpha-value>)",
          foreground: "hsl(var(--accent-foreground) / <alpha-value>)",
          border: "var(--accent-border)",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive) / <alpha-value>)",
          foreground: "hsl(var(--destructive-foreground) / <alpha-value>)",
          border: "var(--destructive-border)",
        },
        ring: "hsl(var(--ring) / <alpha-value>)",
        chart: {
          "1": "hsl(var(--chart-1) / <alpha-value>)",
          "2": "hsl(var(--chart-2) / <alpha-value>)",
          "3": "hsl(var(--chart-3) / <alpha-value>)",
          "4": "hsl(var(--chart-4) / <alpha-value>)",
          "5": "hsl(var(--chart-5) / <alpha-value>)",
        },
        weather: {
          sunny: "hsl(45 100% 60% / <alpha-value>)",
          rainy: "hsl(210 60% 50% / <alpha-value>)",
          cloudy: "hsl(220 15% 60% / <alpha-value>)",
          snow: "hsl(200 30% 85% / <alpha-value>)",
          storm: "hsl(240 30% 30% / <alpha-value>)",
        },
        sidebar: {
          ring: "hsl(var(--sidebar-ring) / <alpha-value>)",
          DEFAULT: "hsl(var(--sidebar) / <alpha-value>)",
          foreground: "hsl(var(--sidebar-foreground) / <alpha-value>)",
          border: "hsl(var(--sidebar-border) / <alpha-value>)",
        },
        "sidebar-primary": {
          DEFAULT: "hsl(var(--sidebar-primary) / <alpha-value>)",
          foreground: "hsl(var(--sidebar-primary-foreground) / <alpha-value>)",
          border: "var(--sidebar-primary-border)",
        },
        "sidebar-accent": {
          DEFAULT: "hsl(var(--sidebar-accent) / <alpha-value>)",
          foreground: "hsl(var(--sidebar-accent-foreground) / <alpha-value>)",
          border: "var(--sidebar-accent-border)"
        },
        status: {
          online: "rgb(34 197 94)",
          away: "rgb(245 158 11)",
          busy: "rgb(239 68 68)",
          offline: "rgb(156 163 175)",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)"],
        serif: ["var(--font-serif)"],
        mono: ["var(--font-mono)"],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          from: { opacity: "0", transform: "translateY(10px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "slide-up": {
          from: { transform: "translateY(100%)" },
          to: { transform: "translateY(0)" },
        },
        "bounce-gentle": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-4px)" },
        },
        "rain-drop": {
          "0%": { transform: "translateY(-100vh) rotate(0deg)", opacity: "0" },
          "10%": { opacity: "1" },
          "90%": { opacity: "1" },
          "100%": { transform: "translateY(100vh) rotate(180deg)", opacity: "0" },
        },
        "snow-flake": {
          "0%": { transform: "translateY(-100vh) rotate(0deg)", opacity: "0" },
          "10%": { opacity: "0.8" },
          "90%": { opacity: "0.8" },
          "100%": { transform: "translateY(100vh) rotate(180deg)", opacity: "0" },
        },
        "sun-rays": {
          "0%": { transform: "translateX(-50%) translateY(-50%) rotate(0deg)", opacity: "0.3" },
          "50%": { opacity: "0.6" },
          "100%": { transform: "translateX(-50%) translateY(-50%) rotate(360deg)", opacity: "0.3" },
        },
        "rain": {
          "0%": { transform: "translateY(-5px)" },
          "50%": { transform: "translateY(5px)" },
          "100%": { transform: "translateY(-5px)" },
        },
        "snow": {
          "0%": { transform: "translateY(-10px) rotate(0deg)" },
          "50%": { transform: "translateY(10px) rotate(90deg)" },
          "100%": { transform: "translateY(-10px) rotate(180deg)" },
        },
        "sun": {
          "0%": { transform: "rotate(0deg) scale(1)" },
          "50%": { transform: "rotate(180deg) scale(1.1)" },
          "100%": { transform: "rotate(360deg) scale(1)" },
        },
        "clouds": {
          "0%": { transform: "translateX(-10px)" },
          "50%": { transform: "translateX(10px)" },
          "100%": { transform: "translateX(-10px)" },
        },
        "thunder": {
          "0%, 90%, 100%": { opacity: "0.3" },
          "45%, 55%": { opacity: "1" },
        },
        "wind": {
          "0%": { transform: "rotate(-5deg)" },
          "50%": { transform: "rotate(5deg)" },
          "100%": { transform: "rotate(-5deg)" },
        },
        "mist": {
          "0%": { opacity: "0.5", transform: "scale(1)" },
          "50%": { opacity: "0.8", transform: "scale(1.1)" },
          "100%": { opacity: "0.5", transform: "scale(1)" },
        },
        "shimmer": {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "loadingDots": {
          "0%": { content: "''" },
          "25%": { content: "'.'" },
          "50%": { content: "'..'" },
          "75%": { content: "'...'" },
          "100%": { content: "''" },
        },
        "glow": {
          from: { boxShadow: "0 0 20px hsla(var(--primary) / 0.3)" },
          to: { boxShadow: "0 0 40px hsla(var(--primary) / 0.6)" },
        },
        "pulseSoft": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.6" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "scaleIn": {
          from: { opacity: "0", transform: "scale(0.9)" },
          to: { opacity: "1", transform: "scale(1)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.5s ease-out",
        "slide-up": "slide-up 0.3s ease-out",
        "bounce-gentle": "bounce-gentle 2s infinite",
        "rain-drop": "rain-drop 2s linear infinite",
        "snow-flake": "snow-flake 3s linear infinite",
        "sun-rays": "sun-rays 4s linear infinite",
        "rain": "rain 2s ease-in-out infinite",
        "snow": "snow 2s ease-in-out infinite",
        "sun": "sun 3s ease-in-out infinite",
        "clouds": "clouds 4s ease-in-out infinite",
        "thunder": "thunder 1s ease-in-out infinite",
        "wind": "wind 2s ease-in-out infinite",
        "mist": "mist 3s ease-in-out infinite",
        "shimmer": "shimmer 1.5s infinite",
        "loading-dots": "loadingDots 1.5s infinite",
        "glow": "glow 2s ease-in-out infinite alternate",
        "pulse-soft": "pulseSoft 2s ease-in-out infinite",
        "float": "float 3s ease-in-out infinite",
        "scale-in": "scaleIn 0.4s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
} satisfies Config;
