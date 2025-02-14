
import React, { useState, useEffect } from "react"; 
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import './App.css';
import Users from "./components/Users";
import Products from "./components/Products";
import AgeBarChart from "./components/AgeBarChart";
import Axios from "axios";


function App() {

  const [listOfUsers, setListOfUsers] = useState([]);

  useEffect(() => {
    // Fetch users data once at the App level
    Axios.get("http://localhost:3001/getUsers").then((response) => {
      setListOfUsers(response.data);
    });
  }, []);

  return (
    <Router>
      <div className="App">
        <nav>
          <ul className="nav-links">
            <li><Link to="/users">Users</Link></li>
            <li><Link to="/products">Products</Link></li>
            <li><Link to="/age-chart">Age Chart</Link></li>
          </ul>
        </nav>
        <Routes>
          <Route path="/users" element={<Users />} />
          <Route path="/products" element={<Products />} />
          <Route 
            path="/age-chart" 
            element={<AgeBarChart listOfUsers={listOfUsers} />} />
        </Routes>
        
      </div>
    </Router>
    
    
  );
}

export default App;
