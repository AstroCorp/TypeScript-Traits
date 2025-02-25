import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import { resolve } from "path";

export default defineConfig({
	build: {
		sourcemap: true,
		lib: {
			entry: resolve(__dirname, "src/applyTraits.ts"),
			name: "applyTraits",
			fileName: (format) => `applyTraits.${format}.js`,
		},
		rollupOptions: {
			external: [],
			output: {
				globals: {},
			},
		},
	},
	plugins: [
		dts({
			insertTypesEntry: true,
		}),
	],
}) 