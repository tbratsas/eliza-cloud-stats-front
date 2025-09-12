import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import PrivateRoute from './components/PrivateRoute';
import DashboardLayout from './components/DashboardLayout';
import SalesPerProduct from './components/reports/SalesPerProduct';

function App() {
  return (
    <Router>
      <div style={{ marginLeft: "5%" }}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/dashboard/*"
            element={
              <PrivateRoute>
                <DashboardLayout />
              </PrivateRoute>
            }
          >
            <Route index element={<h2>Dashboard!</h2>} />
            <Route path="salesperproduct" element={<SalesPerProduct />} />
            {/* Add more nested routes here */}
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
