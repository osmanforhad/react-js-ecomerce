import axios from 'axios';
import React from 'react'
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';

const Navbar = () => {

  const history = useHistory();
  
  const logoutSubmit = (event) => {
    event.preventDefault();

    axios.post(`/api/logout`).then(response => {
      if(response.data.status === 200){
        localStorage.removeItem('auth_token');
        localStorage.removeItem('auth_name');
        swal("Success", response.data.message, "success");
        history.push("/");
      }
    });
  }

  var AuthButtons ='';
  if(!localStorage.getItem('auth_token')){
    AuthButtons = (
      <ul className="navbar-nav">
       <li className="nav-item">
            <Link className="nav-link" to="/login">Login</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/register">Register</Link>
          </li>
      </ul>
    );
  }
  else {
    AuthButtons = (
      <ul className="navbar-nav">
       <li className="nav-item">
            <button type="button" onClick={logoutSubmit} className="nav-link btn btn-danger btn-sm text-white">Logout</button>
          </li>
      </ul>
    );
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark shadow bg-dark sticky-top">
    <div className="container">
      <Link className="navbar-brand" to="#">Navbar</Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <Link className="nav-link active" aria-current="page" to="#">Home</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/collection">Collections</Link>
          </li>
          {AuthButtons}
        </ul>
     
      </div>
    </div>
  </nav>
  )
}

export default Navbar;