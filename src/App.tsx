import React from 'react';
import './App.css';
import Home from './pages/Home';
import 'bootstrap/dist/css/bootstrap.css';

function App() {
  return (
      <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container">
                    <a className="navbar-brand" href="#">Engineering Tech Blogs</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                        </button>
                    <div className="collapse navbar-collapse" id="navbarResponsive">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <a className="nav-link" href="https://github.com/snuzi/engineering-blogs-app">GitHub</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="https://github.com/snuzi/awesome-tech-blogs">Add Blog</a>
                        </li>
                    </ul>
                    </div>
                </div>
            </nav>
            <Home/>
      </div>
  );
}

export default App;
