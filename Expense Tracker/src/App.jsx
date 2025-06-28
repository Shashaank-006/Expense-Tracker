// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
// import Dashboard from './Dashboard';
// import Expense from './Expense';
// import ExpenseDetail from './ExpenseDetail';
// import Income from './Income';
// import Logout from './Validation/Logout';
// import image from './assets/image.png';
// import Profile from './Profile';
// import { ExpenseProvider } from './ExpenseContext';
// import { IncomeProvider } from './IncomeContext';

// import { MdDashboard } from "react-icons/md";
// import { HiOutlineMinusCircle } from "react-icons/hi";
// import { FaMoneyCheckAlt } from "react-icons/fa";
// import { RiLogoutBoxRLine } from "react-icons/ri";

// import { useEffect, useState } from 'react';

// const App = () => {

//   const [token, setToken] = useState(localStorage.getItem("token"));

//   useEffect(() => {
//     if (token) localStorage.setItem("token", token);
//   }, [token]);

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     setToken(null);
//   };
//   return (
//     <ExpenseProvider>
//       <IncomeProvider>
//         <Router>
//           <div className="app-layout">

//             <nav className="sidebar">
//               <h1 className='tracker'>FinSight</h1>
//               <ul className="list">
//                 <li>
//                   <Link to="/dashboard" className="nav-link">
//                     <MdDashboard style={{ marginRight: "8px", verticalAlign: "middle" }} />
//                     Dashboard
//                   </Link>
//                 </li>
//                 <li>
//                   <Link to="/expense" className="nav-link">
//                     <HiOutlineMinusCircle style={{ marginRight: "8px", verticalAlign: "middle" }} />
//                     Expense
//                   </Link>
//                 </li>
//                 <li>
//                   <Link to="/income" className="nav-link">
//                     <FaMoneyCheckAlt style={{ marginRight: "8px", verticalAlign: "middle" }} />
//                     Income
//                   </Link>
//                 </li>
//                 <li>
//                   <Link to="/logout" className="nav-link">
//                     <RiLogoutBoxRLine style={{ marginRight: "8px", verticalAlign: "middle" }} />
//                     Logout
//                   </Link>
//                 </li>
//               </ul>
//               <Link to="/profile" className="profile-link">
//                 <div className="profile-section">
//                   <div className="profile">
//                     <img src={image} alt="Profile" className="picture" />
//                   </div>
//                   <p className="profile-name">Shashaank</p>
//                 </div>
//               </Link>
//             </nav>

//             <main className="main-content">
//               <Routes>
//                 <Route path="/dashboard" element={<Dashboard />} />
//                 <Route path="/expense" element={<Expense />} />
//                 <Route path="/income" element={<Income />} />
//                 <Route path="/logout" element={<Logout />} />
//                 <Route path="/profile" element={<Profile />} />
//               </Routes>
//             </main>

//           </div>
//         </Router>
//       </IncomeProvider>
//     </ExpenseProvider>
//   );
// };

// export default App;

// import React, { useEffect, useState } from 'react';
// import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
// import Dashboard from './Dashboard';
// import Expense from './Expense';
// import Income from './Income';
// import Logout from './Validation/Logout';

// import image from './assets/image.png';
// import Profile from './Profile';
// import { ExpenseProvider } from './ExpenseContext';
// import { IncomeProvider } from './IncomeContext';

// import { MdDashboard } from "react-icons/md";
// import { HiOutlineMinusCircle } from "react-icons/hi";
// import { FaMoneyCheckAlt } from "react-icons/fa";
// import { RiLogoutBoxRLine } from "react-icons/ri";

// const App = () => {

//   return (
//     <ExpenseProvider>
//       <IncomeProvider>
//         <Router>
//           <div className="app-layout">

//             <nav className="sidebar">
//               <h1 className='tracker'>FinSight</h1>
//                <ul className="list">
//                  <li>
//                   <Link to="/dashboard" className="nav-link">
//                      <MdDashboard style={{ marginRight: "8px", verticalAlign: "middle" }} />
//                      Dashboard
//                    </Link>
//                  </li>
//                  <li>
//                    <Link to="/expense" className="nav-link">
//                      <HiOutlineMinusCircle style={{ marginRight: "8px", verticalAlign: "middle" }} />
//                      Expense
//                    </Link>
//                  </li>
//                  <li>
//                    <Link to="/income" className="nav-link">
//                      <FaMoneyCheckAlt style={{ marginRight: "8px", verticalAlign: "middle" }} />
//                      Income
//                    </Link>
//                  </li>
//                <li>
//                   <Link to="/logout" className="nav-link">
//                     <RiLogoutBoxRLine style={{ marginRight: "8px", verticalAlign: "middle" }} />
//                     Logout
//                   </Link>
//                 </li>
//               </ul>
//               <Link to="/profile" className="profile-link">
//                 <div className="profile-section">
//                   <div className="profile">
//                     <img src={image} alt="Profile" className="picture" />
//                   </div>
//                   <p className="profile-name">Shashaank</p>
//                 </div>
//                </Link>
//             </nav>

//             <main className="main-content">
//               <Routes>
//                 <Route path="/dashboard" element={<Dashboard />} />
//                 <Route path="/expense" element={<Expense />} />
//                 <Route path="/income" element={<Income />} />
//                 <Route path="/logout" element={<Logout />} />
//                 <Route path="/profile" element={<Profile />} />
//               </Routes>
//             </main>

//           </div>
//         </Router>
//       </IncomeProvider>
//     </ExpenseProvider>
//   );
// };

// export default App;

// src/App.jsx
import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet, Link } from "react-router-dom";

import Dashboard from './Dashboard';
import Expense from './Expense';
import Income from './Income';
import Logout from './Validation/Logout';
import Login from "./components/Login.jsx";
import Register from "./components/Register";
import Profile from './Profile';

import image from './assets/profile.webp';

import { ExpenseProvider } from './ExpenseContext';
import { IncomeProvider } from './IncomeContext';
import { AuthContext } from "./AuthContext";

import { MdDashboard } from "react-icons/md";
import { HiOutlineMinusCircle } from "react-icons/hi";
import { FaMoneyCheckAlt } from "react-icons/fa";
import { RiLogoutBoxRLine } from "react-icons/ri";

// ✅ Route protection
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("access_token");
  return token ? children : <Navigate to="/login" />;
};

const App = () => {
  return (
    <ExpenseProvider>
      <IncomeProvider>
        <Router>
          <Routes>
            {/* === Public Routes === */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* === Protected Routes === */}
            <Route path="/*" element={
              <PrivateRoute>
                {/* === Sidebar + Layout Inside App.jsx === */}
                <AppLayout />
              </PrivateRoute>
            }>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="expense" element={<Expense />} />
              <Route path="income" element={<Income />} />
              <Route path="logout" element={<Logout />} />
              <Route path="profile" element={<Profile />} />
              <Route path="" element={<Navigate to="/login" />} />
            </Route>

          </Routes>
        </Router>
      </IncomeProvider>
    </ExpenseProvider>
  );
};

const AppLayout = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="app-layout">
      <nav className="sidebar">
        <h1 className='tracker'>FinSight</h1>

        <ul className="list">
          <li>
            <Link to="/dashboard" className="nav-link">
              <MdDashboard style={{ marginRight: "8px", verticalAlign: "middle" }} />
              Dashboard
            </Link>
          </li>

          <li>
            <Link to="/expense" className="nav-link">
              <HiOutlineMinusCircle style={{ marginRight: "8px", verticalAlign: "middle" }} />
              Expense
            </Link>
          </li>

          <li>
            <Link to="/income" className="nav-link">
              <FaMoneyCheckAlt style={{ marginRight: "8px", verticalAlign: "middle" }} />
              Income
            </Link>
          </li>

          <li>
            <Link to="/logout" className="nav-link">
              <RiLogoutBoxRLine style={{ marginRight: "8px", verticalAlign: "middle" }} />
              Logout
            </Link>
          </li>
        </ul>


        <Link to="/profile" className="profile-link">
          <div className="profile-section">
            <div className="profile">
              <img src={image} alt="Profile" className="picture" />
            </div>
          </div>
        </Link>
      </nav>

      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};

export default App;









