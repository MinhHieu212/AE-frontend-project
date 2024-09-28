module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  important: "#root",
  theme: {
    extend: {
      colors: {
        teal: "#21A691",
        myGray: "#c8cad3",
        darkGreen: "#27403E",
        white: "#FFFFFF",
        lightLime: "#ECDFCC",
      },
      theme: {
        screens: {
          sm: "340px",
          // => @media (min-width: 340px) { ... }

          md: "340px",
          // => @media (min-width: 760px) { ... }

          lg: "760px",
          // => @media (min-width: 1024px) { ... }
        },
      },
    },
  },
  corePlugins: {
    preflight: false,
  },
  plugins: [],
};
