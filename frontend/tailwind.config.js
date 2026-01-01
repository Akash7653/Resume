/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Semantic color tokens - Light mode
        'bg-primary': 'rgb(var(--bg-primary))',
        'bg-secondary': 'rgb(var(--bg-secondary))',
        'bg-surface': 'rgb(var(--bg-surface))',
        'bg-accent': 'rgb(var(--bg-accent))',
        
        'text-primary': 'rgb(var(--text-primary))',
        'text-secondary': 'rgb(var(--text-secondary))',
        'text-muted': 'rgb(var(--text-muted))',
        'text-inverse': 'rgb(var(--text-inverse))',
        
        'heading-primary': 'rgb(var(--heading-primary))',
        'heading-secondary': 'rgb(var(--heading-secondary))',
        'heading-accent': 'rgb(var(--heading-accent))',
        
        'border-subtle': 'rgb(var(--border-subtle))',
        'border-medium': 'rgb(var(--border-medium))',
        
        'accent-blue': 'rgb(var(--accent-blue))',
        'accent-purple': 'rgb(var(--accent-purple))',
        'accent-pink': 'rgb(var(--accent-pink))',
        'accent-green': 'rgb(var(--accent-green))',
        'accent-emerald': 'rgb(var(--accent-emerald))',
        'accent-yellow': 'rgb(var(--accent-yellow))',
        'accent-cyan': 'rgb(var(--accent-cyan))',
        'accent-orange': 'rgb(var(--accent-orange))',
        
        // Glass utilities
        'glass-bg': 'rgba(var(--glass-bg), 0.9)',
        'glass-border': 'rgba(var(--glass-border), 0.2)',
        
        // Legacy colors for backward compatibility (soft versions)
        slate: {
          50: 'rgb(248 250 252)',
          100: 'rgb(241 245 249)',
          200: 'rgb(226 232 240)',
          300: 'rgb(203 213 225)',
          400: 'rgb(148 163 184)',
          500: 'rgb(100 116 139)',
          600: 'rgb(71 85 105)',
          700: 'rgb(51 65 85)',
          800: 'rgb(30 41 59)',
          900: 'rgb(15 23 42)',
          950: 'rgb(2 6 23)',
        },
        
        // Soft grays for subtle backgrounds
        gray: {
          50: 'rgb(249 250 251)',
          100: 'rgb(243 244 246)',
          200: 'rgb(229 231 235)',
          300: 'rgb(209 213 219)',
          400: 'rgb(156 163 175)',
          500: 'rgb(107 114 128)',
          600: 'rgb(75 85 99)',
          700: 'rgb(55 65 81)',
          800: 'rgb(31 41 55)',
          900: 'rgb(17 24 39)',
          950: 'rgb(3 7 18)',
        },
        
        // Blues
        blue: {
          50: 'rgb(239 246 255)',
          100: 'rgb(219 234 254)',
          200: 'rgb(191 219 254)',
          300: 'rgb(147 197 253)',
          400: 'rgb(96 165 250)',
          500: 'rgb(59 130 246)',
          600: 'rgb(37 99 235)',
          700: 'rgb(29 78 216)',
          800: 'rgb(30 64 175)',
          900: 'rgb(30 58 138)',
          950: 'rgb(23 37 84)',
        },
        
        // Purples
        purple: {
          50: 'rgb(250 245 255)',
          100: 'rgb(243 232 255)',
          200: 'rgb(233 213 255)',
          300: 'rgb(216 180 254)',
          400: 'rgb(167 139 250)',
          500: 'rgb(139 92 246)',
          600: 'rgb(124 58 237)',
          700: 'rgb(109 40 217)',
          800: 'rgb(91 33 182)',
          900: 'rgb(76 29 149)',
          950: 'rgb(49 20 97)',
        },
        
        // Pinks
        pink: {
          50: 'rgb(253 242 248)',
          100: 'rgb(252 231 243)',
          200: 'rgb(251 207 232)',
          300: 'rgb(249 168 212)',
          400: 'rgb(244 114 182)',
          500: 'rgb(236 72 153)',
          600: 'rgb(219 39 119)',
          700: 'rgb(190 18 60)',
          800: 'rgb(157 23 77)',
          900: 'rgb(131 24 67)',
          950: 'rgb(80 7 36)',
        },
        
        // Greens
        green: {
          50: 'rgb(240 253 244)',
          100: 'rgb(220 252 231)',
          200: 'rgb(187 247 208)',
          300: 'rgb(134 239 172)',
          400: 'rgb(74 222 128)',
          500: 'rgb(34 197 94)',
          600: 'rgb(22 163 74)',
          700: 'rgb(21 128 61)',
          800: 'rgb(22 101 52)',
          900: 'rgb(20 83 45)',
          950: 'rgb(5 20 20)',
        },
        
        // Emeralds
        emerald: {
          50: 'rgb(236 253 245)',
          100: 'rgb(209 250 229)',
          200: 'rgb(167 243 208)',
          300: 'rgb(110 231 183)',
          400: 'rgb(52 211 153)',
          500: 'rgb(16 185 129)',
          600: 'rgb(5 150 105)',
          700: 'rgb(4 120 87)',
          800: 'rgb(6 95 70)',
          900: 'rgb(6 78 59)',
          950: 'rgb(2 44 34)',
        }
      },
      // Enhanced glassmorphism utilities
      backdrop: {
        'light': 'rgba(248, 250, 252, 0.8)',
        'dark': 'rgba(30, 41, 59, 0.8)',
      }
    },
    animation: {
      'float': 'float 6s ease-in-out infinite',
      'slide-up': 'slideUp 1s ease-out forwards',
      'fade-in': 'fadeIn 1s ease-out forwards',
      'spin-slow': 'spin 3s linear infinite',
      'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      'bounce-gentle': 'bounceGentle 2s infinite',
      'glow': 'glow 2s ease-in-out infinite alternate',
      'slide-in-right': 'slideInRight 0.3s ease-out',
      'slide-in-left': 'slideInLeft 0.3s ease-out',
      'scale-in': 'scaleIn 0.2s ease-out',
      'fade-in-up': 'fadeInUp 0.4s ease-out',
      'theme-transition': 'themeTransition 0.3s ease-in-out',
    },
    keyframes: {
      float: {
        '0%, 100%': { transform: 'translateY(0px)' },
        '50%': { transform: 'translateY(-20px)' },
      },
      slideUp: {
        from: {
          opacity: '0',
          transform: 'translateY(30px)',
        },
        to: {
          opacity: '1',
          transform: 'translateY(0)',
        },
      },
      fadeIn: {
        from: { opacity: '0' },
        to: { opacity: '1' },
      },
      bounceGentle: {
        '0%, 100%': { transform: 'translateY(-5%)' },
        '50%': { transform: 'translateY(0)' },
      },
      glow: {
        '0%': { boxShadow: '0 0 5px rgba(59, 130, 246, 0.5)' },
        '100%': { boxShadow: '0 0 20px rgba(147, 51, 234, 0.8)' },
      },
      slideInRight: {
        from: {
          opacity: '0',
          transform: 'translateX(20px)',
        },
        to: {
          opacity: '1',
          transform: 'translateX(0)',
        },
      },
      slideInLeft: {
        from: {
          opacity: '0',
          transform: 'translateX(-20px)',
        },
        to: {
          opacity: '1',
          transform: 'translateX(0)',
        },
      },
      scaleIn: {
        from: {
          opacity: '0',
          transform: 'scale(0.9)',
        },
        to: {
          opacity: '1',
          transform: 'scale(1)',
        },
      },
      fadeInUp: {
        from: {
          opacity: '0',
          transform: 'translateY(10px)',
        },
        to: {
          opacity: '1',
          transform: 'translateY(0)',
        },
      },
      themeTransition: {
        '0%': { opacity: '1' },
        '50%': { opacity: '0.8' },
        '100%': { opacity: '1' },
      }
    },
  },
  plugins: [],
};
