import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom';
import Home from './components/Home';
import Apod from './components/Apod';
import Epic from './components/Epic';
import Rover from './components/Rover';
import Calendar from './components/Calendar';
import About from './components/About';

function App() {
  const logo = 'https://upload.wikimedia.org/wikipedia/commons/e/e5/NASA_logo.svg';
  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand"><img src={logo} alt='NASA Logo' className="brand"></img></Link>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <Link to="/" className="nav-link" id="home-link">Home</Link>
              <Link to="/apod" className="nav-link" id="apod-link">Apod</Link>
              <Link to="/epic" className="nav-link" id="epic-link">Epic</Link>
              <Link to="/rover" className="nav-link" id="rover-link">Rover</Link>
              <Link to="/calendar" className="nav-link" id="calendar-link">Calendar</Link>
              <Link to="/about" className="nav-link" id="about-link">About</Link>
              <a href="https://github.com/Fonta22/tdr-app" className="nav-link" id="github-link"><i className="bi bi-github" /></a>
            </div>
          </div>
        </div>
      </nav>
      <br />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/apod" element={<Apod />} />
          <Route path="/epic" element={<Epic />} />
          <Route path="/rover" element={<Rover />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
      <br />
    </Router>
  );
}

export default App;
