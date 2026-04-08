/** @type {import('tailwindcss').Config} */
module.exports = {
  // OVDE KAŽEŠ TAILWINDU GDE SU TI KOMPONENTE
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {},
  },
  plugins: [],
};
