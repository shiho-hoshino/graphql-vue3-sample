import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],
  server: {
    port: 8888,
  },
  resolve: {
    alias: {
      "~/": `${__dirname}/src/`,
    },
  },
});
