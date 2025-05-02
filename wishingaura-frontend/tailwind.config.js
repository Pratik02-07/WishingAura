/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#8E7AB5',
        secondary: '#B784B7',
        accent: '#ECA869',
        background: {
          DEFAULT: '#FDF4F5',
          dark: '#E8D5DA',
        },
        text: {
          primary: '#2D2B3F',
          secondary: '#4A4458',
        }
      },
      animation: {
        'bounce-slow': 'bounce 3s infinite',
        'float': 'float 3s ease-in-out infinite',
        'fall': 'fall 10s linear infinite',
        'rise': 'rise 8s ease-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'sway': 'sway 6s ease-in-out infinite',
        'sway-slow': 'sway-slow 15s ease-in-out infinite',
        'sparkle': 'sparkle 2s ease-in-out infinite',
        'twinkle': 'twinkle 4s ease-in-out infinite',
        'fadeIn': 'fadeIn 0.3s ease-in-out',
        'slideInDown': 'slideInDown 0.4s ease-in-out',
        'slideInUp': 'slideInUp 0.4s ease-in-out',
        'scaleIn': 'scaleIn 0.3s ease-in-out',
        'zoomInOut': 'zoomInOut 3s ease-in-out infinite',
        'rotateIn': 'rotateIn 0.5s ease-in-out',
        'shimmer': 'shimmer 2.5s ease-in-out infinite',
        'gradient-shift': 'gradient-shift 8s ease infinite',
        'rotate-slow': 'rotate-slow 20s linear infinite',
      },
      keyframes: {
        bounce: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0) scale(1)' },
          '50%': { transform: 'translateY(-20px) scale(1.1)' },
        },
        fall: {
          '0%': { transform: 'translateY(-100%) rotate(0deg)' },
          '100%': { transform: 'translateY(100%) rotate(360deg)' },
        },
        rise: {
          '0%': { transform: 'translateY(100%) scale(0.5)' },
          '100%': { transform: 'translateY(-100%) scale(1.5)' },
        },
        sway: {
          '0%, 100%': { transform: 'rotate(-3deg) scale(1)' },
          '50%': { transform: 'rotate(3deg) scale(1.02)' },
        },
        sparkle: {
          '0%, 100%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.2)', opacity: '0.8' },
        },
        twinkle: {
          '0%, 100%': { opacity: '0.2' },
          '50%': { opacity: '0.5' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideInDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideInUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      backgroundImage: {
        'hearts': "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 48.75c-.67 0-1.32-.25-1.82-.7L14.43 35.3c-3.27-3.27-3.27-8.6 0-11.87 3.27-3.27 8.6-3.27 11.87 0L30 27.13l3.7-3.7c3.27-3.27 8.6-3.27 11.87 0 3.27 3.27 3.27 8.6 0 11.87L31.82 48.05c-.5.45-1.15.7-1.82.7z' fill='rgba(255,255,255,0.2)'/%3E%3C/svg%3E\")",
        'confetti': "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cpath d='M15 15h30v30H15z' fill='rgba(255,255,255,0.2)'/%3E%3Cpath d='M45 15v30H15V15h30zm-5 5H20v20h20V20z' fill='rgba(255,255,255,0.2)'/%3E%3C/g%3E%3C/svg%3E\")",
        'balloons': "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 15c8.28 0 15 6.72 15 15s-6.72 15-15 15-15-6.72-15-15 6.72-15 15-15zm0 5c-5.52 0-10 4.48-10 10s4.48 10 10 10 10-4.48 10-10-4.48-10-10-10z' fill='rgba(255,255,255,0.2)'/%3E%3C/svg%3E\")",
        'music-notes': "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M40 20h-5v20c0 2.76-2.24 5-5 5s-5-2.24-5-5 2.24-5 5-5c1.13 0 2.16.39 3 1.02V15h7v5z' fill='rgba(255,255,255,0.2)'/%3E%3C/svg%3E\")",
        'fireworks': "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 10l4.39 13.5h14.22l-11.5 8.31 4.39 13.5L30 37.19l-11.5 8.12 4.39-13.5-11.5-8.31h14.22L30 10z' fill='rgba(255,255,255,0.2)'/%3E%3C/svg%3E\")",
        'sparkles': "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 20l2.5 7.5H40l-6.25 4.375L36.25 40 30 35.625 23.75 40l2.5-7.5L20 27.5h7.5L30 20z' fill='rgba(255,255,255,0.2)'/%3E%3C/svg%3E\")",
        'stars': "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 10l3.09 9.5h10l-8.09 5.87 3.09 9.5L30 29l-8.09 5.87 3.09-9.5L17 19.5h10L30 10z' fill='rgba(255,255,255,0.2)'/%3E%3C/svg%3E\")",
        'gifts': "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M45 25H15v20h30V25zm-5 15H20v-10h20v10zm0-25H20v5h20v-5z' fill='rgba(255,255,255,0.2)'/%3E%3C/svg%3E\")",
        'clouds': "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M43 30c-.28 0-.53.02-.8.05C41.27 26.24 37.94 23.5 34 23.5c-4.14 0-7.5 3.36-7.5 7.5 0 .52.05 1.02.15 1.5H25c-2.76 0-5 2.24-5 5s2.24 5 5 5h18c3.31 0 6-2.69 6-6s-2.69-6-6-6z' fill='rgba(255,255,255,0.2)'/%3E%3C/svg%3E\")",
      },
      scale: {
        '102': '1.02',
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '4rem',
          xl: '5rem',
          '2xl': '6rem',
        },
      },
      screens: {
        'xs': '475px',
        ...defaultTheme.screens,
      },
    },
  },
  plugins: [],
} 