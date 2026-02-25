/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
        popover: {
          DEFAULT: "var(--popover)",
          foreground: "var(--popover-foreground)",
        },
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)",
        },
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        cambria: {
          gold: "#C5A55A",
          goldDark: "#9E833A",
          cream: "#F5F0E8",
          black: "#000000",
          blackLight: "#0a0a0a",
          panelDark: "#111111",
          panelLight: "#161616",
          red: "#D4443B",
          border: "#2a2a2a",
          borderLight: "#222222",
          muted: "#D9D0C0",
          mutedDark: "#A09080",
          mutedDarker: "#7A6F60",
          mutedDarkest: "#5A5040",
        },
      },
      backgroundImage: {
        'cambria-gold': 'linear-gradient(to right, #C5A55A, #9E833A)',
        'cambria-bg': 'linear-gradient(to bottom, #000000, #0a0a0a)',
      }
    },
  },
  plugins: [],
}
