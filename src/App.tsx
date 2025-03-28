
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Index from "./pages/Index";
import TaskBank from "./pages/TaskBank";
import Resources from "./pages/Resources";
import Reviews from "./pages/Reviews";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import TestSolver from "./pages/TestSolver";
import Profile from "./pages/Profile";
import { AuthProvider } from "./components/auth/AuthContext";
import SingleTaskView from "./pages/SingleTaskView";
import TestStatistics from "./pages/TestStatistics";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow pt-16 md:pt-20">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/task-bank" element={<TaskBank />} />
                <Route path="/resources" element={<Resources />} />
                <Route path="/reviews" element={<Reviews />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/test-solver/:testId" element={<TestSolver />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/profile/statistics/:testId" element={<TestStatistics />} />
                <Route path="/task/:taskId" element={<SingleTaskView />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
