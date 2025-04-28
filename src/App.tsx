
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Index from "./pages/Index";
import SplashScreen from "./pages/SplashScreen";
import LevelSelectionScreen from "./pages/LevelSelectionScreen";
import DailyRoutineScreen from "./pages/DailyRoutineScreen";
import ExerciseDetailScreen from "./pages/ExerciseDetailScreen";
import WeeklyProgressScreen from "./pages/WeeklyProgressScreen";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/splash" element={<SplashScreen />} />
          <Route path="/level-selection" element={<LevelSelectionScreen />} />
          <Route path="/routine" element={<DailyRoutineScreen />} />
          <Route path="/exercise/:exerciseId" element={<ExerciseDetailScreen />} />
          <Route path="/progress" element={<WeeklyProgressScreen />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
