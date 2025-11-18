import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { UserPlacesProvider } from "@/contexts/UserPlacesContext";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import Index from "./pages/Index";
import States from "./pages/States";
import About from "./pages/About";
import Festivals from "./pages/Festivals";
import Arts from "./pages/Arts";
import Heritage from "./pages/Heritage";
import News from "./pages/News";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";
import ScrollToTop from '@/components/ScrollToTop';
import Footer from './components/Footer';
import BharatAIChat from '@/components/BharatAIChat';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <UserPlacesProvider>
          <Router>
            <ScrollToTop />
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <main className="flex-1">
                <Routes>
                  {/* Public routes */}
                  <Route path="/" element={<Index />} />
                  <Route path="/states" element={<States />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/festivals" element={<Festivals />} />
                  <Route path="/arts" element={<Arts />} />
                  <Route path="/heritage" element={<Heritage />} />
                  <Route path="/news" element={<News />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/forgot-password" element={<ForgotPassword />} />
                  
                  {/* Protected routes */}
                  <Route element={<ProtectedRoute />}>
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    {/* Add more protected routes here */}
                  </Route>
                  
                  {/* 404 route */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
              <Footer />
              <BharatAIChat />
            </div>
          </Router>
        </UserPlacesProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
