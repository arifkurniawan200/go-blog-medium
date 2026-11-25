/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        mario: {
          sky: '#5C94FC',
          skyDark: '#2E67D1',
          red: '#E52521',
          redDark: '#B81410',
          coin: '#FBD000',
          coinDark: '#C99700',
          pipe: '#00A800',
          pipeDark: '#007300',
          brick: '#C84C0C',
          brickDark: '#8F3104',
          ink: '#1A1C2C',
          cloud: '#FFFFFF'
        }
      },
      fontFamily: {
        pixel: ['"Press Start 2P"', '"Silkscreen"', 'monospace'],
        arcade: ['"Silkscreen"', '"Press Start 2P"', 'monospace'],
        sans: ['"Nunito"', '"Inter"', 'system-ui', 'sans-serif']
      },
      boxShadow: {
        toon: '0 6px 0 #1A1C2C',
        'toon-sm': '0 4px 0 #1A1C2C',
        'toon-lg': '0 8px 0 #1A1C2C',
        'toon-press': '0 2px 0 #1A1C2C'
      }
    }
  },
  plugins: []
};
