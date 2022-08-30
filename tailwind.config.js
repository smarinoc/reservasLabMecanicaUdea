/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.jsx",
    "./components/**/*.jsx",
  ],
  theme: {
      extend: {
        colors: {
          ColorPrimario: '#00F47F',
          ColorSecundario: '#FFFFFF',
          ColorTerciario: '#FFC872',
          ColorLetraTexto: '#FFFFFF',
          ColorTítulo: '#484747',
          ColorBackground: '#F8F3F3',
        },
        fontSize: {
          título: '25px',
          subtítulo: '22px',
          texto: '18px',
        },
        gridTemplateRows: {
          '8': 'repeat(8, minmax(0, 1fr))',
        },
        gridRow: {
          'span-7': 'span 7 / span 7',
        }
      },
  },
  plugins: [],
}
