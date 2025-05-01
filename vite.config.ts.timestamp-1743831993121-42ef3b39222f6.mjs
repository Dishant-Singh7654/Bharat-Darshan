// vite.config.ts
import { defineConfig } from "file:///D:/AI%20Projects/india-cultural-heritage-main_2/india-cultural-heritage-main/node_modules/vite/dist/node/index.js";
import react from "file:///D:/AI%20Projects/india-cultural-heritage-main_2/india-cultural-heritage-main/node_modules/@vitejs/plugin-react-swc/index.mjs";
import path from "path";
import { componentTagger } from "file:///D:/AI%20Projects/india-cultural-heritage-main_2/india-cultural-heritage-main/node_modules/lovable-tagger/dist/index.js";
var __vite_injected_original_dirname = "D:\\AI Projects\\india-cultural-heritage-main_2\\india-cultural-heritage-main";
var vite_config_default = defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    proxy: {
      "/api/hotels": {
        target: "https://booking-com15.p.rapidapi.com/api/v1/hotels/searchHotelsByCoordinates",
        changeOrigin: true,
        rewrite: (path2) => {
          const url = new URL(path2, "http://localhost");
          const latitude = url.searchParams.get("latitude");
          const longitude = url.searchParams.get("longitude");
          return `?latitude=${latitude}&longitude=${longitude}&adults=1&children_age=0&room_qty=1&units=metric&page_number=1&temperature_unit=c&languagecode=en&currency_code=EUR&location=US`;
        },
        headers: {
          "x-rapidapi-host": "booking-com15.p.rapidapi.com",
          "x-rapidapi-key": "51e604f017msh8eed99744500b93p19d097jsn44cbe101397b"
        }
      }
    }
  },
  plugins: [
    react(),
    mode === "development" && componentTagger()
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__vite_injected_original_dirname, "./src")
    }
  }
}));
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxBSSBQcm9qZWN0c1xcXFxpbmRpYS1jdWx0dXJhbC1oZXJpdGFnZS1tYWluXzJcXFxcaW5kaWEtY3VsdHVyYWwtaGVyaXRhZ2UtbWFpblwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcQUkgUHJvamVjdHNcXFxcaW5kaWEtY3VsdHVyYWwtaGVyaXRhZ2UtbWFpbl8yXFxcXGluZGlhLWN1bHR1cmFsLWhlcml0YWdlLW1haW5cXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L0FJJTIwUHJvamVjdHMvaW5kaWEtY3VsdHVyYWwtaGVyaXRhZ2UtbWFpbl8yL2luZGlhLWN1bHR1cmFsLWhlcml0YWdlLW1haW4vdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tIFwidml0ZVwiO1xuaW1wb3J0IHJlYWN0IGZyb20gXCJAdml0ZWpzL3BsdWdpbi1yZWFjdC1zd2NcIjtcbmltcG9ydCBwYXRoIGZyb20gXCJwYXRoXCI7XG5pbXBvcnQgeyBjb21wb25lbnRUYWdnZXIgfSBmcm9tIFwibG92YWJsZS10YWdnZXJcIjtcblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZygoeyBtb2RlIH0pID0+ICh7XG4gIHNlcnZlcjoge1xuICAgIGhvc3Q6IFwiOjpcIixcbiAgICBwb3J0OiA4MDgwLFxuICAgIHByb3h5OiB7XG4gICAgICAnL2FwaS9ob3RlbHMnOiB7XG4gICAgICAgIHRhcmdldDogJ2h0dHBzOi8vYm9va2luZy1jb20xNS5wLnJhcGlkYXBpLmNvbS9hcGkvdjEvaG90ZWxzL3NlYXJjaEhvdGVsc0J5Q29vcmRpbmF0ZXMnLFxuICAgICAgICBjaGFuZ2VPcmlnaW46IHRydWUsXG4gICAgICAgIHJld3JpdGU6IChwYXRoKSA9PiB7XG4gICAgICAgICAgLy8gRXh0cmFjdCBxdWVyeSBwYXJhbWV0ZXJzIGZyb20gdGhlIHJlcXVlc3RcbiAgICAgICAgICBjb25zdCB1cmwgPSBuZXcgVVJMKHBhdGgsICdodHRwOi8vbG9jYWxob3N0Jyk7XG4gICAgICAgICAgY29uc3QgbGF0aXR1ZGUgPSB1cmwuc2VhcmNoUGFyYW1zLmdldCgnbGF0aXR1ZGUnKTtcbiAgICAgICAgICBjb25zdCBsb25naXR1ZGUgPSB1cmwuc2VhcmNoUGFyYW1zLmdldCgnbG9uZ2l0dWRlJyk7XG4gICAgICAgICAgXG4gICAgICAgICAgLy8gQ29uc3RydWN0IHRoZSB0YXJnZXQgVVJMIHdpdGggcmVxdWlyZWQgcGFyYW1ldGVyc1xuICAgICAgICAgIHJldHVybiBgP2xhdGl0dWRlPSR7bGF0aXR1ZGV9JmxvbmdpdHVkZT0ke2xvbmdpdHVkZX0mYWR1bHRzPTEmY2hpbGRyZW5fYWdlPTAmcm9vbV9xdHk9MSZ1bml0cz1tZXRyaWMmcGFnZV9udW1iZXI9MSZ0ZW1wZXJhdHVyZV91bml0PWMmbGFuZ3VhZ2Vjb2RlPWVuJmN1cnJlbmN5X2NvZGU9RVVSJmxvY2F0aW9uPVVTYDtcbiAgICAgICAgfSxcbiAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICd4LXJhcGlkYXBpLWhvc3QnOiAnYm9va2luZy1jb20xNS5wLnJhcGlkYXBpLmNvbScsXG4gICAgICAgICAgJ3gtcmFwaWRhcGkta2V5JzogJzUxZTYwNGYwMTdtc2g4ZWVkOTk3NDQ1MDBiOTNwMTlkMDk3anNuNDRjYmUxMDEzOTdiJ1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9LFxuICBwbHVnaW5zOiBbXG4gICAgcmVhY3QoKSxcbiAgICBtb2RlID09PSAnZGV2ZWxvcG1lbnQnICYmXG4gICAgY29tcG9uZW50VGFnZ2VyKCksXG4gIF0uZmlsdGVyKEJvb2xlYW4pLFxuICByZXNvbHZlOiB7XG4gICAgYWxpYXM6IHtcbiAgICAgIFwiQFwiOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCBcIi4vc3JjXCIpLFxuICAgIH0sXG4gIH0sXG59KSk7XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQTBaLFNBQVMsb0JBQW9CO0FBQ3ZiLE9BQU8sV0FBVztBQUNsQixPQUFPLFVBQVU7QUFDakIsU0FBUyx1QkFBdUI7QUFIaEMsSUFBTSxtQ0FBbUM7QUFNekMsSUFBTyxzQkFBUSxhQUFhLENBQUMsRUFBRSxLQUFLLE9BQU87QUFBQSxFQUN6QyxRQUFRO0FBQUEsSUFDTixNQUFNO0FBQUEsSUFDTixNQUFNO0FBQUEsSUFDTixPQUFPO0FBQUEsTUFDTCxlQUFlO0FBQUEsUUFDYixRQUFRO0FBQUEsUUFDUixjQUFjO0FBQUEsUUFDZCxTQUFTLENBQUNBLFVBQVM7QUFFakIsZ0JBQU0sTUFBTSxJQUFJLElBQUlBLE9BQU0sa0JBQWtCO0FBQzVDLGdCQUFNLFdBQVcsSUFBSSxhQUFhLElBQUksVUFBVTtBQUNoRCxnQkFBTSxZQUFZLElBQUksYUFBYSxJQUFJLFdBQVc7QUFHbEQsaUJBQU8sYUFBYSxRQUFRLGNBQWMsU0FBUztBQUFBLFFBQ3JEO0FBQUEsUUFDQSxTQUFTO0FBQUEsVUFDUCxtQkFBbUI7QUFBQSxVQUNuQixrQkFBa0I7QUFBQSxRQUNwQjtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1AsTUFBTTtBQUFBLElBQ04sU0FBUyxpQkFDVCxnQkFBZ0I7QUFBQSxFQUNsQixFQUFFLE9BQU8sT0FBTztBQUFBLEVBQ2hCLFNBQVM7QUFBQSxJQUNQLE9BQU87QUFBQSxNQUNMLEtBQUssS0FBSyxRQUFRLGtDQUFXLE9BQU87QUFBQSxJQUN0QztBQUFBLEVBQ0Y7QUFDRixFQUFFOyIsCiAgIm5hbWVzIjogWyJwYXRoIl0KfQo=
