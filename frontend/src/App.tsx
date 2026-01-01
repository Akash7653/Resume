import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { ResumeProvider } from './context/ResumeContext';
import { PaymentProvider } from './context/PaymentContext';
import { UsageProvider } from './context/UsageContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Landing } from './pages/Landing';
import { Login } from './pages/auth/Login';
import { Register } from './pages/auth/Register';
import { Dashboard } from './pages/dashboard/Dashboard';
import { UploadResume } from './pages/dashboard/UploadResume';
import { ResumeResult } from './pages/dashboard/ResumeResult';
import { JDMatch } from './pages/dashboard/JDMatch';
import { Rewrite } from './pages/dashboard/Rewrite';
import { History } from './pages/dashboard/History';
import { Settings } from './pages/dashboard/Settings';
import { PricingTest as Pricing } from './pages/pricing/PricingTest';
import { PaymentSuccess } from './pages/payment/PaymentSuccessTest';
import { PaymentCancel } from './pages/payment/PaymentCancel';

function App() {
  return (
    <Router>
      <ThemeProvider>
        <AuthProvider>
          <UsageProvider>
            <PaymentProvider>
              <ResumeProvider>
                <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/pricing" element={<Pricing />} />
                <Route path="/payment/success" element={<PaymentSuccess />} />
                <Route path="/payment/cancel" element={<PaymentCancel />} />
                <Route path="/test" element={<div style={{padding: '20px', backgroundColor: 'red', color: 'white'}}>Test Route Working!</div>} />

                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/upload"
                  element={
                    <ProtectedRoute>
                      <UploadResume />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/result/:resumeId"
                  element={
                    <ProtectedRoute>
                      <ResumeResult />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/jd-match"
                  element={
                    <ProtectedRoute>
                      <JDMatch />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/rewrite"
                  element={
                    <ProtectedRoute>
                      <Rewrite />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/history"
                  element={
                    <ProtectedRoute>
                      <History />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/settings"
                  element={
                    <ProtectedRoute>
                      <Settings />
                    </ProtectedRoute>
                  }
                />

                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </ResumeProvider>
          </PaymentProvider>
        </UsageProvider>
      </AuthProvider>
    </ThemeProvider>
  </Router>
  );
}

export default App;
