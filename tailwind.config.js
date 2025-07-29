/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gray: {
          750: '#374151',
        },
        slate: {
          750: '#334155',
        },
        // Exact colors from screenshot
        'body-bg': 'rgb(0, 35, 31)',
        'searchBar-bg': 'rgb(0, 40, 31)',
        'header-bg': '#48645e',
        'nav-bg': '#3a4553',
        'nav-text': '#9ca3af',
        'nav-active-bg': '#14b8a6',
        'nav-active-text': '#ffffff',
        'hifun-bg': '#8b5cf6',
        'hyperrun-bg': '#3b82f6', 
        'pvp-bg': '#ef4444',
        'felix-bg': '#f97316',
        'hypurrco-bg': '#6b7280',
        'hyperidge-bg': '#6366f1',
        'twitter-bg': '#1da1f2',
        'telegram-bg': '#0088cc',
        'support-bg': '#ec4899'
      },
    },
  },
  plugins: [],
}

