import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Modules from './pages/Modules';
import Labs from './pages/Labs';
import Tests from './pages/Tests';
import Profile from './pages/Profile';
import LectureView from './pages/LectureView';
import TestView from './pages/TestView';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ProgressProvider } from './contexts/ProgressContext';
import Footer from './components/Footer';

function AppContent() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="pt-20">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/modules" element={<Modules />} />
          <Route path="/labs" element={<Labs />} />
          <Route path="/tests" element={<Tests />} />
          <Route path="/lecture/:id" element={<LectureView />} />
          <Route path="/test/:id" element={<TestView />} />
          <Route 
            path="/profile" 
            element={user ? <Profile /> : <Navigate to="/" />} 
          />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <ProgressProvider>
        <Router>
          <AppContent />
        </Router>
      </ProgressProvider>
    </AuthProvider>
  );
}

export default App;