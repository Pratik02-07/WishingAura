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
        primary: {
          50: '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
          DEFAULT: '#6366f1',
        },
        secondary: {
          50: '#fdf4ff',
          100: '#fae8ff',
          200: '#f5d0fe',
          300: '#f0abfc',
          400: '#e879f9',
          500: '#d946ef',
          600: '#c026d3',
          700: '#a21caf',
          800: '#86198f',
          900: '#701a75',
          DEFAULT: '#d946ef',
        },
        accent: {
          50: '#fefce8',
          100: '#fef9c3',
          200: '#fef08a',
          300: '#fde047',
          400: '#facc15',
          500: '#eab308',
          600: '#ca8a04',
          700: '#a16207',
          800: '#854d0e',
          900: '#713f12',
          DEFAULT: '#eab308',
        },
        background: {
          DEFAULT: '#f8fafc',
          dark: '#0f172a',
          card: 'rgba(255, 255, 255, 0.8)',
        },
        text: {
          primary: '#1e293b',
          secondary: '#64748b',
          muted: '#94a3b8',
        },
        success: {
          50: '#ecfdf5',
          100: '#d1fae5',
          500: '#10b981',
          600: '#059669',
          DEFAULT: '#10b981',
        },
        warning: {
          50: '#fffbeb',
          100: '#fef3c7',
          500: '#f59e0b',
          600: '#d97706',
          DEFAULT: '#f59e0b',
        },
        error: {
          50: '#fef2f2',
          100: '#fee2e2',
          500: '#ef4444',
          600: '#dc2626',
          DEFAULT: '#ef4444',
        }
      },
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
        display: ['Inter', ...defaultTheme.fontFamily.sans],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
        '7xl': ['4.5rem', { lineHeight: '1' }],
        '8xl': ['6rem', { lineHeight: '1' }],
        '9xl': ['8rem', { lineHeight: '1' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'medium': '0 4px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        'large': '0 10px 40px -10px rgba(0, 0, 0, 0.15), 0 20px 25px -5px rgba(0, 0, 0, 0.1)',
        'glow': '0 0 20px rgba(99, 102, 241, 0.3)',
        'glow-lg': '0 0 30px rgba(99, 102, 241, 0.4)',
        '3xl': '0 35px 60px -12px rgba(0, 0, 0, 0.25)',
      },
      animation: {
        'bounce-gentle': 'bounce-gentle 2s ease-in-out infinite',
        'pulse-soft': 'pulse-soft 2s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'shimmer': 'shimmer 2s infinite',
        'fadeIn': 'fadeIn 0.6s ease-out',
        'slideInDown': 'slideInDown 0.8s ease-out',
        'slideInUp': 'slideInUp 0.8s ease-out',
        'scaleIn': 'scaleIn 0.5s ease-out',
        'spin-slow': 'spin 3s linear infinite',
        'bounce-slow': 'bounce 2s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 10s ease-in-out infinite',
        'gradient-x': 'gradient-x 15s ease infinite',
        'glitch': 'glitch 1s linear infinite',
        'neon': 'neon 1.5s ease-in-out infinite alternate',
        'wave': 'wave 1.5s ease-in-out infinite'
      },
      keyframes: {
        'bounce-gentle': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'glow': {
          'from': { boxShadow: '0 0 20px rgba(99, 102, 241, 0.3)' },
          'to': { boxShadow: '0 0 30px rgba(99, 102, 241, 0.6)' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'fadeIn': {
          'from': { opacity: '0', transform: 'translateY(20px)' },
          'to': { opacity: '1', transform: 'translateY(0)' },
        },
        'slideInDown': {
          'from': { transform: 'translateY(-30px)', opacity: '0' },
          'to': { transform: 'translateY(0)', opacity: '1' },
        },
        'slideInUp': {
          'from': { transform: 'translateY(30px)', opacity: '0' },
          'to': { transform: 'translateY(0)', opacity: '1' },
        },
        'scaleIn': {
          'from': { transform: 'scale(0.95)', opacity: '0' },
          'to': { transform: 'scale(1)', opacity: '1' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' }
        },
        'gradient-x': {
          '0%, 100%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' }
        },
        'glitch': {
          '2%, 64%': { transform: 'translate(2px, 0) skew(0deg)' },
          '4%': { transform: 'translate(-2px, 0) skew(0deg)' },
          '62%': { transform: 'translate(0, 0) skew(5deg)' }
        },
        'neon': {
          '0%, 100%': { 
            textShadow: '0 0 5px #fff, 0 0 10px #fff, 0 0 15px #0073e6, 0 0 20px #0073e6, 0 0 25px #0073e6, 0 0 30px #0073e6, 0 0 35px #0073e6'
          },
          '50%': { 
            textShadow: '0 0 10px #fff, 0 0 20px #fff, 0 0 30px #0073e6, 0 0 40px #0073e6, 0 0 50px #0073e6, 0 0 60px #0073e6, 0 0 70px #0073e6'
          }
        },
        'wave': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' }
        }
      },
      backdropBlur: {
        xs: '2px',
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