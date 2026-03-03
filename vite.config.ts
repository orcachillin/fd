import { defineConfig } from "vite";
import { resolve } from "path";
import inject from "@rollup/plugin-inject";

export default defineConfig({
	root: "src/client",
	base: "/",
	build: {
		target: "esnext",
		outDir: "../../dist/client/generated",
		minify: false,
		// emptyOutDir: true,
		// sourcemap: true,
		rollupOptions: {
			input: resolve("./src/client/bundled/index.html"),
			output: {
				entryFileNames: "[name].js",
				assetFileNames: "[name].[ext]",
			},
		},
	},
	plugins: [
		inject({
			htmx: "htmx.org",
		}),
	],
});
