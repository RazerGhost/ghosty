import {heroui} from "@heroui/theme"

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
      },
    },
  },
  darkMode: "class",
  plugins: [heroui({
  "themes": {
    "light": {
      "colors": {
        "default": {
          "50": "#fafafa",
          "100": "#f2f2f3",
          "200": "#ebebec",
          "300": "#e3e3e6",
          "400": "#dcdcdf",
          "500": "#d4d4d8",
          "600": "#afafb2",
          "700": "#8a8a8c",
          "800": "#656567",
          "900": "#404041",
          "foreground": "#000",
          "DEFAULT": "#d4d4d8"
        },
        "primary": {
          "50": "#dffbfd",
          "100": "#b3f5fa",
          "200": "#86eff6",
          "300": "#59eaf3",
          "400": "#2de4f0",
          "500": "#00deed",
          "600": "#00b7c4",
          "700": "#00909a",
          "800": "#006971",
          "900": "#004347",
          "foreground": "#000",
          "DEFAULT": "#00deed"
        },
        "secondary": {
          "50": "#f8e4f6",
          "100": "#eebfea",
          "200": "#e499dd",
          "300": "#db73d1",
          "400": "#d14ec4",
          "500": "#c728b8",
          "600": "#a42198",
          "700": "#811a78",
          "800": "#5f1357",
          "900": "#3c0c37",
          "foreground": "#fff",
          "DEFAULT": "#c728b8"
        },
        "success": {
          "50": "#e2f8ec",
          "100": "#b9efd1",
          "200": "#91e5b5",
          "300": "#68dc9a",
          "400": "#40d27f",
          "500": "#17c964",
          "600": "#13a653",
          "700": "#0f8341",
          "800": "#0b5f30",
          "900": "#073c1e",
          "foreground": "#000",
          "DEFAULT": "#17c964"
        },
        "warning": {
          "50": "#fef4e4",
          "100": "#fce4bd",
          "200": "#fad497",
          "300": "#f9c571",
          "400": "#f7b54a",
          "500": "#f5a524",
          "600": "#ca881e",
          "700": "#9f6b17",
          "800": "#744e11",
          "900": "#4a320b",
          "foreground": "#000",
          "DEFAULT": "#f5a524"
        },
        "danger": {
          "50": "#fee1eb",
          "100": "#fbb8cf",
          "200": "#f98eb3",
          "300": "#f76598",
          "400": "#f53b7c",
          "500": "#f31260",
          "600": "#c80f4f",
          "700": "#9e0c3e",
          "800": "#73092e",
          "900": "#49051d",
          "foreground": "#000",
          "DEFAULT": "#f31260"
        },
        "background": "#ffffff",
        "foreground": "#000000",
        "content1": {
          "DEFAULT": "#ffffff",
          "foreground": "#000"
        },
        "content2": {
          "DEFAULT": "#f4f4f5",
          "foreground": "#000"
        },
        "content3": {
          "DEFAULT": "#e4e4e7",
          "foreground": "#000"
        },
        "content4": {
          "DEFAULT": "#d4d4d8",
          "foreground": "#000"
        },
        "focus": "#006FEE",
        "overlay": "#000000"
      }
    },
    "dark": {
      "colors": {
        "default": {
          "50": "#0d0d0e",
          "100": "#19191c",
          "200": "#26262a",
          "300": "#323238",
          "400": "#3f3f46",
          "500": "#65656b",
          "600": "#8c8c90",
          "700": "#b2b2b5",
          "800": "#d9d9da",
          "900": "#ffffff",
          "foreground": "#fff",
          "DEFAULT": "#3f3f46"
        },
        "primary": {
          "50": "#004347",
          "100": "#006971",
          "200": "#00909a",
          "300": "#00b7c4",
          "400": "#00deed",
          "500": "#2de4f0",
          "600": "#59eaf3",
          "700": "#86eff6",
          "800": "#b3f5fa",
          "900": "#dffbfd",
          "foreground": "#000",
          "DEFAULT": "#00deed"
        },
        "secondary": {
          "50": "#3c0c37",
          "100": "#5f1357",
          "200": "#811a78",
          "300": "#a42198",
          "400": "#c728b8",
          "500": "#d14ec4",
          "600": "#db73d1",
          "700": "#e499dd",
          "800": "#eebfea",
          "900": "#f8e4f6",
          "foreground": "#fff",
          "DEFAULT": "#c728b8"
        },
        "success": {
          "50": "#073c1e",
          "100": "#0b5f30",
          "200": "#0f8341",
          "300": "#13a653",
          "400": "#17c964",
          "500": "#40d27f",
          "600": "#68dc9a",
          "700": "#91e5b5",
          "800": "#b9efd1",
          "900": "#e2f8ec",
          "foreground": "#000",
          "DEFAULT": "#17c964"
        },
        "warning": {
          "50": "#4a320b",
          "100": "#744e11",
          "200": "#9f6b17",
          "300": "#ca881e",
          "400": "#f5a524",
          "500": "#f7b54a",
          "600": "#f9c571",
          "700": "#fad497",
          "800": "#fce4bd",
          "900": "#fef4e4",
          "foreground": "#000",
          "DEFAULT": "#f5a524"
        },
        "danger": {
          "50": "#49051d",
          "100": "#73092e",
          "200": "#9e0c3e",
          "300": "#c80f4f",
          "400": "#f31260",
          "500": "#f53b7c",
          "600": "#f76598",
          "700": "#f98eb3",
          "800": "#fbb8cf",
          "900": "#fee1eb",
          "foreground": "#000",
          "DEFAULT": "#f31260"
        },
        "background": "#000000",
        "foreground": "#ffffff",
        "content1": {
          "DEFAULT": "#18181b",
          "foreground": "#fff"
        },
        "content2": {
          "DEFAULT": "#27272a",
          "foreground": "#fff"
        },
        "content3": {
          "DEFAULT": "#3f3f46",
          "foreground": "#fff"
        },
        "content4": {
          "DEFAULT": "#52525b",
          "foreground": "#fff"
        },
        "focus": "#006FEE",
        "overlay": "#ffffff"
      }
    }
  },
  "layout": {
    "disabledOpacity": "0.4"
  }
})],
}

module.exports = config;
