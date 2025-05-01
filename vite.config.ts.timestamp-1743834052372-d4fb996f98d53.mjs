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
        target: "https://booking-com15.p.rapidapi.com",
        changeOrigin: true,
        secure: true,
        rewrite: (path2) => {
          const url = new URL(path2, "http://localhost");
          const latitude = url.searchParams.get("latitude");
          const longitude = url.searchParams.get("longitude");
          return `/api/v1/hotels/searchHotelsByCoordinates?latitude=${latitude}&longitude=${longitude}&adults=1&children_age=0&room_qty=1&units=metric&page_number=1&temperature_unit=c&languagecode=en&currency_code=EUR&location=US`;
        },
        configure: (proxy, options) => {
          proxy.on("proxyReq", (proxyReq, req, res) => {
            proxyReq.setHeader("x-rapidapi-host", "booking-com15.p.rapidapi.com");
            proxyReq.setHeader("x-rapidapi-key", "51e604f017msh8eed99744500b93p19d097jsn44cbe101397b");
            proxyReq.setHeader("Accept", "application/json");
            proxyReq.setHeader("Accept-Encoding", "gzip, deflate");
          });
          proxy.on("error", (err, req, res) => {
            console.error("Proxy error:", err);
          });
          proxy.on("proxyRes", (proxyRes, req, res) => {
            console.log(`Proxy response: ${proxyRes.statusCode} for ${req.url}`);
          });
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxBSSBQcm9qZWN0c1xcXFxpbmRpYS1jdWx0dXJhbC1oZXJpdGFnZS1tYWluXzJcXFxcaW5kaWEtY3VsdHVyYWwtaGVyaXRhZ2UtbWFpblwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcQUkgUHJvamVjdHNcXFxcaW5kaWEtY3VsdHVyYWwtaGVyaXRhZ2UtbWFpbl8yXFxcXGluZGlhLWN1bHR1cmFsLWhlcml0YWdlLW1haW5cXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L0FJJTIwUHJvamVjdHMvaW5kaWEtY3VsdHVyYWwtaGVyaXRhZ2UtbWFpbl8yL2luZGlhLWN1bHR1cmFsLWhlcml0YWdlLW1haW4vdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tIFwidml0ZVwiO1xuaW1wb3J0IHJlYWN0IGZyb20gXCJAdml0ZWpzL3BsdWdpbi1yZWFjdC1zd2NcIjtcbmltcG9ydCBwYXRoIGZyb20gXCJwYXRoXCI7XG5pbXBvcnQgeyBjb21wb25lbnRUYWdnZXIgfSBmcm9tIFwibG92YWJsZS10YWdnZXJcIjtcblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZygoeyBtb2RlIH0pID0+ICh7XG4gIHNlcnZlcjoge1xuICAgIGhvc3Q6IFwiOjpcIixcbiAgICBwb3J0OiA4MDgwLFxuICAgIHByb3h5OiB7XG4gICAgICAnL2FwaS9ob3RlbHMnOiB7XG4gICAgICAgIHRhcmdldDogJ2h0dHBzOi8vYm9va2luZy1jb20xNS5wLnJhcGlkYXBpLmNvbScsXG4gICAgICAgIGNoYW5nZU9yaWdpbjogdHJ1ZSxcbiAgICAgICAgc2VjdXJlOiB0cnVlLFxuICAgICAgICByZXdyaXRlOiAocGF0aCkgPT4ge1xuICAgICAgICAgIC8vIEV4dHJhY3QgcXVlcnkgcGFyYW1ldGVycyBmcm9tIHRoZSByZXF1ZXN0XG4gICAgICAgICAgY29uc3QgdXJsID0gbmV3IFVSTChwYXRoLCAnaHR0cDovL2xvY2FsaG9zdCcpO1xuICAgICAgICAgIGNvbnN0IGxhdGl0dWRlID0gdXJsLnNlYXJjaFBhcmFtcy5nZXQoJ2xhdGl0dWRlJyk7XG4gICAgICAgICAgY29uc3QgbG9uZ2l0dWRlID0gdXJsLnNlYXJjaFBhcmFtcy5nZXQoJ2xvbmdpdHVkZScpO1xuICAgICAgICAgIFxuICAgICAgICAgIC8vIENvbnN0cnVjdCB0aGUgdGFyZ2V0IFVSTCB3aXRoIHJlcXVpcmVkIHBhcmFtZXRlcnNcbiAgICAgICAgICByZXR1cm4gYC9hcGkvdjEvaG90ZWxzL3NlYXJjaEhvdGVsc0J5Q29vcmRpbmF0ZXM/bGF0aXR1ZGU9JHtsYXRpdHVkZX0mbG9uZ2l0dWRlPSR7bG9uZ2l0dWRlfSZhZHVsdHM9MSZjaGlsZHJlbl9hZ2U9MCZyb29tX3F0eT0xJnVuaXRzPW1ldHJpYyZwYWdlX251bWJlcj0xJnRlbXBlcmF0dXJlX3VuaXQ9YyZsYW5ndWFnZWNvZGU9ZW4mY3VycmVuY3lfY29kZT1FVVImbG9jYXRpb249VVNgO1xuICAgICAgICB9LFxuICAgICAgICBjb25maWd1cmU6IChwcm94eSwgb3B0aW9ucykgPT4ge1xuICAgICAgICAgIHByb3h5Lm9uKCdwcm94eVJlcScsIChwcm94eVJlcSwgcmVxLCByZXMpID0+IHtcbiAgICAgICAgICAgIC8vIEFkZCBSYXBpZEFQSSBoZWFkZXJzIHRvIGV2ZXJ5IHJlcXVlc3RcbiAgICAgICAgICAgIHByb3h5UmVxLnNldEhlYWRlcigneC1yYXBpZGFwaS1ob3N0JywgJ2Jvb2tpbmctY29tMTUucC5yYXBpZGFwaS5jb20nKTtcbiAgICAgICAgICAgIHByb3h5UmVxLnNldEhlYWRlcigneC1yYXBpZGFwaS1rZXknLCAnNTFlNjA0ZjAxN21zaDhlZWQ5OTc0NDUwMGI5M3AxOWQwOTdqc240NGNiZTEwMTM5N2InKTtcbiAgICAgICAgICAgIC8vIEFkZCBhZGRpdGlvbmFsIGhlYWRlcnMgdGhhdCBtaWdodCBoZWxwIHdpdGggYXV0aGVudGljYXRpb25cbiAgICAgICAgICAgIHByb3h5UmVxLnNldEhlYWRlcignQWNjZXB0JywgJ2FwcGxpY2F0aW9uL2pzb24nKTtcbiAgICAgICAgICAgIHByb3h5UmVxLnNldEhlYWRlcignQWNjZXB0LUVuY29kaW5nJywgJ2d6aXAsIGRlZmxhdGUnKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBcbiAgICAgICAgICAvLyBIYW5kbGUgcHJveHkgZXJyb3JzXG4gICAgICAgICAgcHJveHkub24oJ2Vycm9yJywgKGVyciwgcmVxLCByZXMpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ1Byb3h5IGVycm9yOicsIGVycik7XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgXG4gICAgICAgICAgLy8gTG9nIHByb3h5IHJlc3BvbnNlcyBmb3IgZGVidWdnaW5nXG4gICAgICAgICAgcHJveHkub24oJ3Byb3h5UmVzJywgKHByb3h5UmVzLCByZXEsIHJlcykgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coYFByb3h5IHJlc3BvbnNlOiAke3Byb3h5UmVzLnN0YXR1c0NvZGV9IGZvciAke3JlcS51cmx9YCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH0sXG4gIHBsdWdpbnM6IFtcbiAgICByZWFjdCgpLFxuICAgIG1vZGUgPT09ICdkZXZlbG9wbWVudCcgJiZcbiAgICBjb21wb25lbnRUYWdnZXIoKSxcbiAgXS5maWx0ZXIoQm9vbGVhbiksXG4gIHJlc29sdmU6IHtcbiAgICBhbGlhczoge1xuICAgICAgXCJAXCI6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsIFwiLi9zcmNcIiksXG4gICAgfSxcbiAgfSxcbn0pKTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBMFosU0FBUyxvQkFBb0I7QUFDdmIsT0FBTyxXQUFXO0FBQ2xCLE9BQU8sVUFBVTtBQUNqQixTQUFTLHVCQUF1QjtBQUhoQyxJQUFNLG1DQUFtQztBQU16QyxJQUFPLHNCQUFRLGFBQWEsQ0FBQyxFQUFFLEtBQUssT0FBTztBQUFBLEVBQ3pDLFFBQVE7QUFBQSxJQUNOLE1BQU07QUFBQSxJQUNOLE1BQU07QUFBQSxJQUNOLE9BQU87QUFBQSxNQUNMLGVBQWU7QUFBQSxRQUNiLFFBQVE7QUFBQSxRQUNSLGNBQWM7QUFBQSxRQUNkLFFBQVE7QUFBQSxRQUNSLFNBQVMsQ0FBQ0EsVUFBUztBQUVqQixnQkFBTSxNQUFNLElBQUksSUFBSUEsT0FBTSxrQkFBa0I7QUFDNUMsZ0JBQU0sV0FBVyxJQUFJLGFBQWEsSUFBSSxVQUFVO0FBQ2hELGdCQUFNLFlBQVksSUFBSSxhQUFhLElBQUksV0FBVztBQUdsRCxpQkFBTyxxREFBcUQsUUFBUSxjQUFjLFNBQVM7QUFBQSxRQUM3RjtBQUFBLFFBQ0EsV0FBVyxDQUFDLE9BQU8sWUFBWTtBQUM3QixnQkFBTSxHQUFHLFlBQVksQ0FBQyxVQUFVLEtBQUssUUFBUTtBQUUzQyxxQkFBUyxVQUFVLG1CQUFtQiw4QkFBOEI7QUFDcEUscUJBQVMsVUFBVSxrQkFBa0Isb0RBQW9EO0FBRXpGLHFCQUFTLFVBQVUsVUFBVSxrQkFBa0I7QUFDL0MscUJBQVMsVUFBVSxtQkFBbUIsZUFBZTtBQUFBLFVBQ3ZELENBQUM7QUFHRCxnQkFBTSxHQUFHLFNBQVMsQ0FBQyxLQUFLLEtBQUssUUFBUTtBQUNuQyxvQkFBUSxNQUFNLGdCQUFnQixHQUFHO0FBQUEsVUFDbkMsQ0FBQztBQUdELGdCQUFNLEdBQUcsWUFBWSxDQUFDLFVBQVUsS0FBSyxRQUFRO0FBQzNDLG9CQUFRLElBQUksbUJBQW1CLFNBQVMsVUFBVSxRQUFRLElBQUksR0FBRyxFQUFFO0FBQUEsVUFDckUsQ0FBQztBQUFBLFFBQ0g7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNQLE1BQU07QUFBQSxJQUNOLFNBQVMsaUJBQ1QsZ0JBQWdCO0FBQUEsRUFDbEIsRUFBRSxPQUFPLE9BQU87QUFBQSxFQUNoQixTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxLQUFLLEtBQUssUUFBUSxrQ0FBVyxPQUFPO0FBQUEsSUFDdEM7QUFBQSxFQUNGO0FBQ0YsRUFBRTsiLAogICJuYW1lcyI6IFsicGF0aCJdCn0K
