// frontend/tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}", // Memindai semua file JS, TS, JSX, TSX di dalam src
    ],
    theme: {
        extend: {},
    },
    plugins: [],
}