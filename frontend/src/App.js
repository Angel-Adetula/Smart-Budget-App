import './App.css';
import Checklist from './pages/Checklist';
import Welcome from './pages/Welcome';
import InputBudget from './pages/InputBudget';
import {Routes, Route, Link, useLocation } from "react-router-dom";
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Budget from './pages/Budget';
import DisplayTransactions from './pages/DisplayTransactions';

function App() {

  return (
    <div className="bg">
      <nav className= "nav-height">
        <ul className="nav nav-pills">
        <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="signup">Sign up</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="login">Sign in</Link>
            </li>
        </ul>
      </nav>

      <div className='routes-wrapper'>
        <Routes>
            <Route index element={<Welcome/>}/>
            <Route path = "Signup" element = {<SignUp/>}/>
            <Route path = "Login" element= {<Login />}/>
            <Route path = "Checklist" element = {<Checklist/>}/>
            <Route path = "InputBudget" element= {<InputBudget/>}/>
            <Route path = "Budget" element={<Budget/>}/>
            <Route path = "DisplayTransactions" element={<DisplayTransactions/>}/>
          </Routes>
      </div>
  </div>
  )
}

export default App;
