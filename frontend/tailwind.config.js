/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  // plugins: [
  //   // This plugin will prevent Tailwind CSS from styling elements with the "no-tailwind" class
  //   function ({ addUtilities }) {
  //     addUtilities({
  //       '.no-tailwind': {
  //         ':not(.no-tailwind) > &': {
  //           '@apply': 'none',
  //         },
  //       },
  //     });
  //   },
  // ],
};
