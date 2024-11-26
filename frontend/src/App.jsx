// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AboutUs from './pages/AboutUs';  // Create this page similarly
import Membership from './pages/Membership';  // Create this page similarly
import ContactUs from './pages/ContactUs';  // Create this page similarly
import Register from './pages/Register';
import Login from './pages/Login';
import Payment from './pages/Payment';
import Dashboard from './pages/dashboard';
import Profile from './pages/profile'; 
import AdminDashboard from './pages/admin/AdminDashboard';
// import AdminMembersList from './pages/admin/AdminMembersList';
import AdminLogin from './pages/admin/AdminLogin';
import AdminMembers from './pages/admin/AdminMembers';
import PaymentForm from './pages/Payment';
import CreateMemo from './pages/CreateMemo';
import MemoList from './pages/MemoList';
import GenerateReport from './pages/admin/AdminGetReport'
import EmployeValidation from './pages/EmployeValidation'

function App() {
  return (
    <Router>

      <div className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/membership" element={<Membership />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} /> 
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          {/* <Route path="/admin/members-list" element={<AdminMembersList />} /> */}
          <Route path="/admin/members" element={<AdminMembers />} />
          <Route path="/payment-form" element={<PaymentForm  />} />
          <Route path="/memo" element={<MemoList />} />
          <Route path="/memo/create" element={<CreateMemo />} />
          <Route path="/generate-reports" element={<GenerateReport />} />
          <Route path="/membership-validation" element={<EmployeValidation />} />
          

        </Routes>
      </div>

      {/* Footer Component */}
      <Footer />
    </Router>
  );
}

export default App;
