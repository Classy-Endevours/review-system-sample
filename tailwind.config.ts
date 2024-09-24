import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        'deep-sky-blue': 'rgb(0, 191, 255)',
        'dodger-blue': 'rgb(30, 144, 255)',
        'steel-blue': 'rgb(70, 130, 180)',
        'royal-blue': 'rgb(65, 105, 225)',
        'midnight-blue': 'rgb(25, 25, 112)',
      },
    },
  },
  plugins: [],
};
export default config;
