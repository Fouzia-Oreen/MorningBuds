/* eslint-disable no-undef */

const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    flowbite.content(),
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/index.css"
  ],
  theme: {
     colors :{
       dark: {
        50: "#212529",
        100: "#343a40",
        200: "#495057",
        300: "#6c757d",
        400: "#adb5bd",
        500: "#ced4da",
       },
       light: {
        50:"#f5cb5c",
        100:"#b4d2fc",
        200:"#A0C6FA",
        500:"#a3cef1",
        600:"#6096ba",
        700:"#5e7fa3",
        800:"#254664",
        900:"#274C77"
       },
        // "darkClr-1":"#191d24",
        // "darkClr-2":"#2e3239",
        // "darkClr-3":"#45484e",
        // "darkClr-4":"#8f9195",
        // "darkClr-5":"#aeb0b4",
    
        // "lightClr-1":"#A0C6FA",
        // "lightClr-2":"#A0C6FA",
        // "lightClr-3":"#D1DFF0",
        // "lightClr-4": "#2a3746",
        // "lightClr-5": "#37485C",
        // "lightClr-6": "#4d6683"
    },
  },
  plugins: [
    // ...
    flowbite.plugin(),
  ],
};