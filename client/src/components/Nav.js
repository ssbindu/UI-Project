import React, { useState } from 'react';
import {Outlet, Link, useLocation} from "react-router-dom";
import '../App.css';

const Navbar = () => {
    const[path, setPath] = useState("/");
    const location = useLocation();
    console.log(location.pathname);
    //setPath(location.pathname);
    return (
      <div>
        <nav className="navbar navbar-expand-lg bg-light">
          <div className="container-fluid">
            <Link className="nav-link" to='/'>Social Media App</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                {location.pathname !="/profile" &&
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/login">Login</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/register">Registration</Link>
                  </li>
                </>
                
                }
                {location.pathname =="/profile" &&
                <li className="nav-item">
                  <Link className="nav-link" to="/profile">Profile</Link>
                </li>
                }
              </ul>
            </div>
          </div>
        </nav>
        <Outlet />
      </div>
    );
  }
  
  export default Navbar;