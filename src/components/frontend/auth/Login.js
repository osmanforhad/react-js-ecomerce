import axios from 'axios';
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import swal from 'sweetalert';
import Navbar from '../../../layouts/frontend/Navbar';

const Login = () => {

    const history = useHistory();
    const [loginInput, setLogin] = useState({
        email: '',
        password: '',
        error_list: [],
    });

    const handleInput = (event) => {
        event.persist();
        setLogin({...loginInput, [event.target.name]: event.target.value});
    }

    const loginSubmit = (event) => {
        event.preventDefault();
        const data = {
            email: loginInput.email,
            password: loginInput.password,
        }
        axios.get('/sanctum/csrf-cookie').then(response => {
            axios.post(`/api/login`, data).then(response => {
                if(response.data.status === 200){
                    localStorage.setItem('auth_token', response.data.token);
                    localStorage.setItem('auth_name', response.data.username);
                    swal("Success", response.data.message, "success");
                    history.push("/");
                }
                else if(response.data.status === 401){
                    swal("Warning", response.data.message, "warning");
                }
                else {
                    setLogin({...loginInput, error_list: response.data.validation_errors});
                }
            });
        });
    }

  return (
    <div>
    <Navbar />
    <div className="container py-5">
    <div className="row justify-content-center">
        <div className="col-md-6">
            <div className="card">
                <div className="card-header">
                    <h4>Login</h4>
                </div>
                <div className="card-body">
                    <form onSubmit={loginSubmit}>
                        <div className="form-group mb-3">
                            <label>Email ID : </label>
                            <input type="text" name="email" onChange={handleInput} value={loginInput.email} className="form-control" />  
                        <span className="text-danger">{loginInput.error_list.email}</span>
                        </div>
                        <div className="form-group mb-3">
                            <label>Password: </label>
                            <input type="password" name="password" onChange={handleInput} value={loginInput.password} className="form-control" />  
                            <span className="text-danger">{loginInput.error_list.password}</span>
                        </div>

                        <div className="form-group mb-3">
                            <button type="submit" className="btn btn-primary">Login</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    </div>
    </div>
  )
}

export default Login;