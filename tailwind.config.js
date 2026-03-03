/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        cambria: {
          gold: '#C5A55A',
          goldDark: '#9E833A',
          cream: '#F5F0E8',
          black: '#000000',
          blackLight: '#0a0a0a',
          panelDark: '#111111',
          panelLight: '#000000',
          red: '#D4443B',
          border: '#2a2a2a',
          borderLight: '#222222',
          muted: '#D9D0C0',
          mutedDark: '#A09080',
          mutedDarker: '#7A6F60',
          mutedDarkest: '#5A5040',
        },
      },
      backgroundImage: {
        'cambria-gold': 'linear-gradient(to right, #C5A55A, #9E833A)',
        'cambria-bg': 'linear-gradient(to bottom, #000000, #0a0a0a)',
      },
    },
  },
  plugins: [],
};
