import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/styles/**/*.{css}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;
