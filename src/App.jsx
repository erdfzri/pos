import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layout/MainLayout';
import Dashboard from './pages/dashboard/Dashboard';
import POS from './pages/pos/POS';
import Products from './pages/products/Products';
import Transactions from './pages/transactions/Transactions';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import LandingPage from './pages/landing/LandingPage';
import './App.css';

function App() {
  const isAuthenticated = !!localStorage.getItem('token');

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        <Route path="/dashboard" element={isAuthenticated ? <MainLayout /> : <Login />}>
          <Route index element={<Dashboard />} />
          <Route path="pos" element={<POS />} />
          <Route path="products" element={<Products />} />
          <Route path="categories" element={<div className="p-8"><h2>Categories (In Development)</h2></div>} />
          <Route path="transactions" element={<Transactions />} />
          <Route path="customers" element={<div className="p-8"><h2>Customers (In Development)</h2></div>} />
          <Route path="reports" element={<div className="p-8"><h2>Reports (In Development)</h2></div>} />
          <Route path="settings" element={<div className="p-8"><h2>Settings (In Development)</h2></div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
