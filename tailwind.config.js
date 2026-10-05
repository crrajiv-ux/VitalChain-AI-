/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary clinical blues
        vital: {
          50:  '#eef6ff',
          100: '#daeaff',
          200: '#bdd8ff',
          300: '#90bbfd',
          400: '#5b95fa',
          500: '#3470f6',
          600: '#1d50eb',
          700: '#163cd8',
          800: '#1832af',
          900: '#192f89',
          950: '#141f53',
        },
        // Medical greens (safe indicators)
        sage: {
          50:  '#edfcf4',
          100: '#d3f8e4',
          200: '#aaf0cd',
          300: '#72e2b0',
          400: '#38cc8d',
          500: '#14b074',
          600: '#08905e',
          700: '#07734d',
          800: '#095b3e',
          900: '#094b34',
          950: '#032a1e',
        },
        // Risk/alert ambers
        risk: {
          50:  '#fff8eb',
          100: '#feecc7',
          200: '#fdd68a',
          300: '#fcba4d',
          400: '#fba020',
          500: '#f57f09',
          600: '#d95b04',
          700: '#b43c07',
          800: '#922f0d',
          900: '#78280e',
          950: '#451203',
        },
        // Danger reds
        critical: {
          50:  '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d',
        },
        // Neutral clinical grays
        clinical: {
          50:  '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        },
      },
      fontFamily: {
        sans: ['"DM Sans"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
        display: ['"Syne"', 'sans-serif'],
      },
      boxShadow: {
        'card':    '0 1px 3px 0 rgb(0 0 0 / 0.04), 0 4px 16px 0 rgb(0 0 0 / 0.06)',
        'card-md': '0 4px 6px -1px rgb(0 0 0 / 0.05), 0 10px 32px -2px rgb(0 0 0 / 0.08)',
        'glow-safe':     '0 0 0 3px rgb(20 176 116 / 0.20)',
        'glow-vital':    '0 0 0 3px rgb(52 112 246 / 0.20)',
        'glow-critical': '0 0 0 3px rgb(239 68 68 / 0.20)',
      },
      animation: {
        'pulse-slow':  'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'ping-slow':   'ping 2.5s cubic-bezier(0, 0, 0.2, 1) infinite',
        'fade-in':     'fadeIn 0.5s ease forwards',
        'slide-up':    'slideUp 0.4s ease forwards',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0' },
          to:   { opacity: '1' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(12px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}