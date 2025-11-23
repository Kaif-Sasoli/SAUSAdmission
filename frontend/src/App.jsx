import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';

import { AuthProvider } from './contexts/AuthContext';

// Layouts
import { AuthLayout } from './layout/AuthLayout';
import { DashboardLayout } from './layout/DashboardLayout';

// Auth Pages
import SignIn from './pages/auth/SignIn'
import SignUp from './pages/auth/SignUp' 

// Dashboard
import UserDashboard from './pages/dashboard/UserDashboard';

// User Dashboard
import Instructions from './pages/dashboard/Instructions';
import SubmitApplication from './pages/dashboard/SubmitApplication';

function App() {
  return (
    <AuthProvider>
    <Router>
      {/* Toaster */}
      <ToastContainer position="top-right" autoClose={3000} />

      <Routes>
        {/* Authentication Routes */}
        <Route path="/" element={<AuthLayout />}>
          <Route index element={<Navigate to="signin" />} />
          <Route path="signin" element={<SignIn />} />
          <Route path="signup" element={<SignUp />} />
        </Route>

        <Route path='/dashboard' element={<DashboardLayout/>}>
          <Route path='student' element={<UserDashboard/>}/>
       </Route>

       <Route path='/admission' element={<DashboardLayout/>}>
          <Route path='user' element={<UserDashboard/>}/>
          <Route path='instructions' element={<Instructions/>}/>
          <Route path='application' element={<SubmitApplication/>}/>
       </Route>

      </Routes>
    </Router>
    </AuthProvider>
  )
}

export default App
