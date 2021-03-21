import React from 'react';
import './App.css';
import Home from './pages/HomeInfiniteScroll';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';

function App() {
  return (
      <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container">
                    <a className="navbar-brand" href="#">DevBlogs.net</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                        </button>
                    <div className="collapse navbar-collapse" id="navbarResponsive">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <a className="nav-link" href="https://github.com/snuzi/devblogs">GitHub</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="https://github.com/snuzi/awesome-dev-blogs">Add Your Blog</a>
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
