/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Fundal profund: navy / dark slate
        ink: {
          950: '#04070f',
          900: '#070c18',
          800: '#0b1222',
          700: '#111b2f',
          600: '#18253d',
          500: '#22334f',
        },
        // Accent principal: albastru electric -> cyan neon
        volt: {
          50: '#e8fbff',
          100: '#c9f4ff',
          200: '#93e9ff',
          300: '#54d8ff',
          400: '#22c2ff',
          500: '#06a5ec',
          600: '#0083c4',
          700: '#00679d',
          800: '#065481',
          900: '#0a466b',
        },
        // Accent secundar subtil: chihlimbar (zona electrică / siguranță)
        ember: {
          200: '#fde3a7',
          300: '#fbcf72',
          400: '#f8b83c',
          500: '#f0a01a',
          600: '#cf7c0c',
        },
      },
      fontFamily: {
        display: ['"Sora"', 'system-ui', 'sans-serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.75rem',
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(84,216,255,.14), 0 24px 70px -28px rgba(6,165,236,.55)',
        'glow-lg': '0 0 0 1px rgba(84,216,255,.18), 0 40px 120px -30px rgba(6,165,236,.65)',
        ember: '0 0 0 1px rgba(248,184,60,.18), 0 24px 70px -30px rgba(240,160,26,.55)',
        bento: '0 1px 0 0 rgba(255,255,255,.05) inset, 0 30px 60px -40px rgba(0,0,0,.9)',
      },
      backgroundImage: {
        'mesh-hero':
          'radial-gradient(60% 55% at 12% 8%, rgba(6,165,236,.28) 0%, transparent 60%), radial-gradient(50% 45% at 88% 12%, rgba(84,216,255,.20) 0%, transparent 62%), radial-gradient(45% 45% at 70% 90%, rgba(248,184,60,.12) 0%, transparent 60%)',
        'grid-fine':
          'linear-gradient(to right, rgba(148,190,255,.07) 1px, transparent 1px), linear-gradient(to bottom, rgba(148,190,255,.07) 1px, transparent 1px)',
        'glass-sheen':
          'linear-gradient(140deg, rgba(255,255,255,.10) 0%, rgba(255,255,255,.02) 38%, rgba(255,255,255,0) 60%)',
      },
      backgroundSize: {
        'grid-fine': '56px 56px',
      },
      keyframes: {
        'float-slow': {
          '0%, 100%': { transform: 'translate3d(0,0,0) scale(1)' },
          '50%': { transform: 'translate3d(20px,-22px,0) scale(1.05)' },
        },
      },
      animation: {
        'float-slow': 'float-slow 18s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
