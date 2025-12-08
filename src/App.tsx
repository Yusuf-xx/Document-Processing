import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Sidebar } from './components/Layout/Sidebar';
import { Header } from './components/Layout/Header';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { DocumentReceipt } from './pages/DocumentReceipt';
import { DocumentScan } from './pages/DocumentScan';
import { OCRVerification } from './pages/OCRVerification';
import { DocumentClassification } from './pages/DocumentClassification';
import { DocumentTracking } from './pages/DocumentTracking';
import { DocumentWorkflow } from './pages/DocumentWorkflow';
import { Archive } from './pages/Archive';
import { UserManagement } from './pages/UserManagement';
import { Reports } from './pages/Reports';
import { Settings } from './pages/Settings';
import { Calendar } from './pages/Calendar';
import './App.css';

function App() {
  const [isAuthenticated, _setIsAuthenticated] = useState(true); // Set to true for demo

  if (!isAuthenticated) {
    return (
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    );
  }

  return (
    <Router>
      <div className="app">
        <Sidebar />
        <div className="main-content">
          <Header />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/receipt" element={<DocumentReceipt />} />
            <Route path="/scan" element={<DocumentScan />} />
            <Route path="/verification" element={<OCRVerification />} />
            <Route path="/classification" element={<DocumentClassification />} />
            <Route path="/tracking" element={<DocumentTracking />} />
            <Route path="/workflow" element={<DocumentWorkflow />} />
            <Route path="/archive" element={<Archive />} />
            <Route path="/users" element={<UserManagement />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
