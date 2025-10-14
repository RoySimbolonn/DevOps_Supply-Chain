/** @type {import('tailwindcss').Config} */
import withMT from "@material-tailwind/react/utils/withMT";

export default withMT({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        HIJAU: "#006A67",
        BIRU: "#26355D",
      },
    },
  },
  plugins: [],
});
