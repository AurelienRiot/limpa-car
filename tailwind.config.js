/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  mode: "jit",
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0, opacity: 0 },
          to: { height: "var(--radix-accordion-content-height)", opacity: 1 },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)", opacity: 1 },
          to: { height: 0, opacity: 0 },
        },
        "collapsible-down": {
          from: { height: 0, opacity: 0 },
          to: { height: "var(--radix-collapsible-content-height)", opacity: 1 },
        },
        "collapsible-up": {
          from: {
            height: "var(--radix-collapsible-content-height)",
            opacity: 1,
          },
          to: { height: 0, opacity: 0 },
        },
        "reveal-in": {
          "0%": { width: "0%", color: "hsl(var(--primary-foreground))" },
          "100%": { width: "100%", color: "hsl(var(--primary-foreground))" },
        },
        "reveal-out": {
          "0%": { width: "100%", color: "hsl(var(--primary-foreground))" },
          "100%": { width: "0%", color: "hsl(var(--primary-foreground))" },
        },
        "bg-to-primary": {
          "0%": { backgroundColor: "transparent" },
          "100%": { backgroundColor: "hsl(var(--primary))" },
        },

        "bg-to-transparent": {
          "0%": { backgroundColor: "hsl(var(--primary))" },
          "100%": { backgroundColor: "transparent" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "fade-out": {
          from: { opacity: "1" },
          to: { opacity: "0" },
        },
        "gauge-fill": {
          from: { "stroke-dashoffset": "332", opacity: "0" },
          to: { opacity: "1" },
        },
        jump: {
          "50%": {
            transform: "translateY(-4px)",
            "border-color": "rgb(117, 117, 117)",
          },
          "100%": {
            " ": "translateY(0px)",
            "border-color": "rgb(119, 118, 118)",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "collapsible-down": "collapsible-down 0.2s ease-out",
        "collapsible-up": "collapsible-up 0.2s ease-out",
        "reveal-in": "reveal-in .2s ease-out .1s forwards",
        "reveal-out": "reveal-out .2s ease-out forwards",
        "bg-to-primary": "bg-to-primary .1s ease-out forwards",
        "bg-to-transparent": "bg-to-transparent .1s ease-out .2s forwards",
        "gauge-fadeIn": "gauge-fadeIn 1s ease forwards",
        "fade-in": "fade-in 1s ease forwards",
        "fade-out": "fade-out 1s ease forwards",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("tailwindcss-debug-screens"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/container-queries"),
  ],
};
