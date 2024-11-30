export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontFamily: {
      'mono': ['JetBrains Mono', 'monospace'],
    },
    extend: {
      colors: {
        'editor-black': '#1e1e1e',
        'blue-accent': "#2BA6FF",
        'border-color': '#FFFFFF1a',
      }
    },
  },
  plugins: [],
};
