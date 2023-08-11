import { resolve } from "path";
import { defineConfig, mergeConfig } from "vite";
import dts from "vite-plugin-dts";
import rootConfig from "../../vite.config";

const config = defineConfig({
  plugins: [dts({ include: "lib", rollupTypes: true })],
  build: {
    lib: {
      entry: resolve(__dirname, "lib/index.ts"),
      name: "shammer",
      fileName: "shammer",
    },
  },
});

export default mergeConfig(rootConfig, config);
