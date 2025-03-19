import React, { useState } from 'react';
import {BrowserRouter as Router, Route, Link, Routes} from 'react-router-dom';
import VacancyManager from "./components/JobManager";
import AuthPanel from './components/AuthPanel';
import '@tabler/core/dist/css/tabler.min.css';
import VacancyForm from "./components/JobForm";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token"));

  return (
      <Router>
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link className="navbar-brand" to="/">
              Job Board
            </Link>
            {isAuthenticated ? (
                <div>
                  <Link className="btn btn-outline-primary" to="/jobs/create">
                    Create Job
                  </Link>
                  <Link className="btn btn-outline-primary" to="/jobs/manager">
                    Manage Vacansies
                  </Link>
                  <button
                      className="btn btn-outline-danger"
                      onClick={() => setIsAuthenticated(false)}
                  >
                    Logout
                  </button>
                </div>
            ) : (
                <Link className="btn btn-outline-primary" to="/auth">
                  Login
                </Link>
            )}
          </nav>
          <Routes>
            <Route path="/auth" element={<AuthPanel setIsAuthenticated={setIsAuthenticated} />} />
            <Route path="/jobs/create" element={<VacancyForm />} />
            <Route path="/jobs/manager" element={<VacancyManager />} />
            <Route path="/" element={<h1>Welcome to the Job Board</h1>} />
          </Routes>
        </div>
      </Router>
  );
}

export default App;