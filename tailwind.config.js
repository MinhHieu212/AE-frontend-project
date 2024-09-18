module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  important: "#root",
  theme: {
    extend: {
      colors: {
        teal: "#21A691",
        lime: "#87DF2C",
        darkGreen: "#27403E",
        white: "#FFFFFF",
      },
    },
  },
  corePlugins: {
    // Remove the Tailwind CSS preflight styles so it can use Material UI's preflight instead (CssBaseline).
    preflight: false,
  },
  plugins: [],
};
