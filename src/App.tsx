
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Index from './pages/Index';
import LevelSelectionScreen from './pages/LevelSelectionScreen';
import DailyRoutineScreen from './pages/DailyRoutineScreen';
import ExerciseDetailScreen from './pages/ExerciseDetailScreen';
import WeeklyProgressScreen from './pages/WeeklyProgressScreen';
import NotFound from './pages/NotFound';
import TechnicalAnalysisScreen from './pages/TechnicalAnalysisScreen';
import Layout from './components/Layout';
import ScheduleScreen from './pages/ScheduleScreen';
import TrainersScreen from './pages/TrainersScreen';
import { Toaster } from 'sonner';
import './App.css';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout><Index /></Layout>} />
          <Route path="/level-selection" element={<Layout><LevelSelectionScreen /></Layout>} />
          <Route path="/routine" element={<Layout><DailyRoutineScreen /></Layout>} />
          <Route path="/exercise/:exerciseId" element={<Layout><ExerciseDetailScreen /></Layout>} />
          <Route path="/progress" element={<Layout><WeeklyProgressScreen /></Layout>} />
          <Route path="/technical-analysis" element={<Layout><TechnicalAnalysisScreen /></Layout>} />
          <Route path="/schedule" element={<Layout><ScheduleScreen /></Layout>} />
          <Route path="/trainers" element={<Layout><TrainersScreen /></Layout>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <Toaster position="top-center" />
    </>
  );
}

export default App;
