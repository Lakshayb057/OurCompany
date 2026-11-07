/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        midnight: {
          DEFAULT: '#09090B',
          950: '#040306',
          900: '#060608',
          800: '#0E0D13',
          700: '#15131E',
          card: '#12101B',
          surface: '#181525',
          border: '#281E40',
        },
        light: {
          DEFAULT: '#FBFBFE',
          50: '#FFFFFF',
          100: '#F7F5FE',
          200: '#F0ECFC',
          card: '#FFFFFF',
          surface: '#F6F3FF',
          border: '#E7E0FB',
          text: '#120E24',
          subtext: '#585172',
        },
        electric: {
          purple: '#7C2CF5',
          light: '#9550F8',
          dark: '#6217D9',
        },
        lavender: {
          glow: '#B66CFF',
          light: '#D3A4FF',
          muted: '#8D7EAD',
          soft: '#F3ECFF',
          tint: '#ECE4FF',
        },
        deep: {
          violet: '#4B12C9',
        },
        charcoal: {
          DEFAULT: '#121118',
          subtle: '#1B1924',
        },
        muted: {
          gray: '#A4A1AD',
          dark: '#656270',
        },
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-glow': 'radial-gradient(circle at 50% 20%, rgba(124, 44, 245, 0.15) 0%, rgba(182, 108, 255, 0.1) 40%, transparent 70%)',
        'purple-glow': 'linear-gradient(135deg, #7C2CF5 0%, #4B12C9 50%, #B66CFF 100%)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
};
