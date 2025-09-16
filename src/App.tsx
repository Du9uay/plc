import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import ScrollToTop from './components/ScrollToTop';
import HomePage from './pages/HomePage';
import ObjectivesPage from './pages/ObjectivesPage';
import CareersPage from './pages/CareersPage';
import AutomationIndustryPage from './pages/course/AutomationIndustryPage';
import PLCBasicsPage from './pages/course/PLCBasicsPage';
import IOWiringPage from './pages/course/IOWiringPage';
import ProgramDevelopmentPage from './pages/course/ProgramDevelopmentPage';
import SafetyPage from './pages/course/SafetyPage';
import CourseSummaryPage from './pages/CourseSummaryPage';
import CourseTestPage from './pages/CourseTestPage';
import HomeworkPage from './pages/HomeworkPage';

const App: React.FC = () => {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 text-white">
        <Navigation />
        <div className="container mx-auto px-4 pt-20">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/objectives" element={<ObjectivesPage />} />
            <Route path="/careers" element={<CareersPage />} />
            <Route path="/course/automation-industry" element={<AutomationIndustryPage />} />
            <Route path="/course/plc-basics" element={<PLCBasicsPage />} />
            <Route path="/course/io-wiring" element={<IOWiringPage />} />
            <Route path="/course/program-development" element={<ProgramDevelopmentPage />} />
            <Route path="/course/safety" element={<SafetyPage />} />
            <Route path="/course-summary" element={<CourseSummaryPage />} />
            <Route path="/course-test" element={<CourseTestPage />} />
            <Route path="/homework" element={<HomeworkPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App; 