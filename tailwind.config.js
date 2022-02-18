module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        midnight: '#0F172A',
        midnightB: '#0B1120',
        blueA: '#0EA5E9',
        blueB: '#38BDF8',
        blueB: '#22D3EE',
        blueC: '#7DD3FC',
        blueD: '#BAE6FD',
        purpleA: '#6366F1',
        purpleB: '#4338CA',
        pinkA: '#F472B6',
        pinkB: '#BE185D',
        whiteA: '#F1F5F9',
        grayA: '#59687F',
        grayB: '#475569',
        grayC: '#334155',
        spotify: '#18D860',
      },
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
}
