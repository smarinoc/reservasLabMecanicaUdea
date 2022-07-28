/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
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
      },
    },
  },
  plugins: [],
}
