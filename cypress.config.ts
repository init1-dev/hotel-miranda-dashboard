import { defineConfig } from "cypress";

export default defineConfig({
  projectId: 'q1k474',
  e2e: {
    baseUrl: "http://localhost:5173/",
    viewportWidth: 1920,
    viewportHeight: 1080,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
