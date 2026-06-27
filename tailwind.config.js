/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        clinic: {
          green: "#2E7D32",
          light: "#81C784",
          gold: "#FFD54F",
          ink: "#102016",
          mist: "#F2FAF3",
        },
      },
      fontFamily: {
        heading: ["Poppins", "sans-serif"],
        body: ["Inter", "sans-serif"],
      },
      boxShadow: {
        luxury: "0 30px 90px rgba(46, 125, 50, 0.18)",
        card: "0 20px 55px rgba(16, 32, 22, 0.10)",
      },
      borderRadius: {
        luxury: "24px",
      },
    },
  },
  plugins: [],
};
