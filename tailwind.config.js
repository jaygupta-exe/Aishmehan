/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'near-black': '#0B0D09',
        'deep-olive': '#20251A',
        'army-olive': '#4B5320',
        'muted-olive': '#626744',
        'khaki': '#B5A878',
        'coyote': '#8A7655',
        'off-white': '#F1F0E8',
      },
      fontFamily: {
        display: ['var(--font-oswald)', 'sans-serif'],
        geo: ['var(--font-chakra)', 'sans-serif'],
        signature: ['var(--font-caveat)', 'cursive'],
        sans: ['var(--font-inter)', 'sans-serif'],
      },
      letterSpacing: {
        'tightest': '-0.04em',
        'widest-xl': '0.25em',
        'widest-2xl': '0.35em',
      },
      boxShadow: {
        'glow-khaki': '0 0 25px -5px rgba(181, 168, 120, 0.35)',
        'glow-olive': '0 0 30px -5px rgba(75, 83, 32, 0.3)',
      },
    },
  },
  plugins: [],
};
