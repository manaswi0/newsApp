import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Link
} from "react-router-dom";

export class Navbar extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">ManaswiNews</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav">
                  <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <Link className="nav-link" aria-current="page" to="/general">General</Link>
                    
                    <Link className="nav-link" to="/business">Business</Link>
                    <Link className="nav-link" to="/entertainment">Entertainment</Link>
                    <Link className="nav-link" to="/health">Health</Link>
                    <Link className="nav-link" to="/science">Science</Link>
                    <Link className="nav-link" to="/sports">Sports</Link>
                    <Link className="nav-link" to="/technology">Technology</Link>
                  </ul>
                </div>
                </div>
        
                    <form className="d-flex" role="search">
                      <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                      <button className="btn btn-outline-success" type="submit">Search</button>
                    </form>
            </div>
        </nav>
      </div>
    )
  }
}

export default Navbar
