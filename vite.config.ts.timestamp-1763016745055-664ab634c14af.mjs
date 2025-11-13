// vite.config.ts
import { defineConfig } from "file:///C:/Users/TWC/Downloads/What%20Great%20Service%20Looks%20Like/workspace/shadcn-ui/node_modules/.pnpm/vite@5.4.19_@types+node@22.16.5/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Users/TWC/Downloads/What%20Great%20Service%20Looks%20Like/workspace/shadcn-ui/node_modules/.pnpm/@vitejs+plugin-react-swc@3.11.0_vite@5.4.19/node_modules/@vitejs/plugin-react-swc/index.js";
import path from "path";
import { viteSourceLocator } from "file:///C:/Users/TWC/Downloads/What%20Great%20Service%20Looks%20Like/workspace/shadcn-ui/node_modules/.pnpm/@metagptx+vite-plugin-source-locator@0.0.6_rollup@2.79.2_vite@5.4.19/node_modules/@metagptx/vite-plugin-source-locator/dist/index.mjs";
var __vite_injected_original_dirname = "C:\\Users\\TWC\\Downloads\\What Great Service Looks Like\\workspace\\shadcn-ui";
var vite_config_default = defineConfig(({ mode }) => ({
  plugins: [
    viteSourceLocator({
      prefix: "mgx"
    }),
    react()
  ],
  server: {
    watch: {
      usePolling: true,
      interval: 800
      /* 300~1500 */
    }
  },
  resolve: {
    alias: {
      "@": path.resolve(__vite_injected_original_dirname, "./src")
    }
  }
}));
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxUV0NcXFxcRG93bmxvYWRzXFxcXFdoYXQgR3JlYXQgU2VydmljZSBMb29rcyBMaWtlXFxcXHdvcmtzcGFjZVxcXFxzaGFkY24tdWlcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXFRXQ1xcXFxEb3dubG9hZHNcXFxcV2hhdCBHcmVhdCBTZXJ2aWNlIExvb2tzIExpa2VcXFxcd29ya3NwYWNlXFxcXHNoYWRjbi11aVxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvVFdDL0Rvd25sb2Fkcy9XaGF0JTIwR3JlYXQlMjBTZXJ2aWNlJTIwTG9va3MlMjBMaWtlL3dvcmtzcGFjZS9zaGFkY24tdWkvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJztcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdC1zd2MnO1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgeyB2aXRlU291cmNlTG9jYXRvciB9IGZyb20gJ0BtZXRhZ3B0eC92aXRlLXBsdWdpbi1zb3VyY2UtbG9jYXRvcic7XG5cbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoKHsgbW9kZSB9KSA9PiAoe1xuICBwbHVnaW5zOiBbXG4gICAgdml0ZVNvdXJjZUxvY2F0b3Ioe1xuICAgICAgcHJlZml4OiAnbWd4JyxcbiAgICB9KSxcbiAgICByZWFjdCgpLFxuICBdLFxuICBzZXJ2ZXI6IHtcbiAgICB3YXRjaDogeyB1c2VQb2xsaW5nOiB0cnVlLCBpbnRlcnZhbDogODAwIC8qIDMwMH4xNTAwICovIH0sXG4gIH0sXG4gIHJlc29sdmU6IHtcbiAgICBhbGlhczoge1xuICAgICAgJ0AnOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnLi9zcmMnKSxcbiAgICB9LFxuICB9LFxufSkpO1xuXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQWdhLFNBQVMsb0JBQW9CO0FBQzdiLE9BQU8sV0FBVztBQUNsQixPQUFPLFVBQVU7QUFDakIsU0FBUyx5QkFBeUI7QUFIbEMsSUFBTSxtQ0FBbUM7QUFNekMsSUFBTyxzQkFBUSxhQUFhLENBQUMsRUFBRSxLQUFLLE9BQU87QUFBQSxFQUN6QyxTQUFTO0FBQUEsSUFDUCxrQkFBa0I7QUFBQSxNQUNoQixRQUFRO0FBQUEsSUFDVixDQUFDO0FBQUEsSUFDRCxNQUFNO0FBQUEsRUFDUjtBQUFBLEVBQ0EsUUFBUTtBQUFBLElBQ04sT0FBTztBQUFBLE1BQUUsWUFBWTtBQUFBLE1BQU0sVUFBVTtBQUFBO0FBQUEsSUFBbUI7QUFBQSxFQUMxRDtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1AsT0FBTztBQUFBLE1BQ0wsS0FBSyxLQUFLLFFBQVEsa0NBQVcsT0FBTztBQUFBLElBQ3RDO0FBQUEsRUFDRjtBQUNGLEVBQUU7IiwKICAibmFtZXMiOiBbXQp9Cg==
