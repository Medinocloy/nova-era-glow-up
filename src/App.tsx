
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Index from './pages/Index';
import LevelSelectionScreen from './pages/LevelSelectionScreen';
import DailyRoutineScreen from './pages/DailyRoutineScreen';
import ExerciseDetailScreen from './pages/ExerciseDetailScreen';
import WeeklyProgressScreen from './pages/WeeklyProgressScreen';
import NotFound from './pages/NotFound';
import TechnicalAnalysisScreen from './pages/TechnicalAnalysisScreen';
import { Toaster } from 'sonner';
import './App.css';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/level-selection" element={<LevelSelectionScreen />} />
          <Route path="/routine" element={<DailyRoutineScreen />} />
          <Route path="/exercise/:exerciseId" element={<ExerciseDetailScreen />} />
          <Route path="/progress" element={<WeeklyProgressScreen />} />
          <Route path="/technical-analysis" element={<TechnicalAnalysisScreen />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <Toaster position="top-center" />
    </>
  );
}

export default App;
