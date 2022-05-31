import axios from 'axios';
import React,{useState} from 'react'
import { useHistory } from 'react-router-dom';
import swal from 'sweetalert';
import Navbar from '../../../layouts/frontend/Navbar';

const Register = () => {

    const history = useHistory();
    const [registerInput, setRegister] = useState({
        name: '',
        email: '',
        password: '',
        error_list:[],
    });

    const handleInput = (event) => {
        event.persist();
        setRegister({...registerInput, [event.target.name]: event.target.value});
    }

    const registerSubmit = (event) => {
        event.preventDefault();

        const data = {
            name: registerInput.name,
            email: registerInput.email,
            password: registerInput.password,
        }

        axios.get('/sanctum/csrf-cookie').then(response => {
            axios.post(`/api/register`, data).then( response => {
                if(response.data.status === 200){
                    localStorage.setItem('auth_token', response.data.token);
                    localStorage.setItem('auth_name', response.data.username);
                    swal("Success", response.data.message, "success");
                    history.push("/");
                }
                else{
                    setRegister({...registerInput, error_list: response.data.validation_errors});
                }
            })
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
                    <h4>Register</h4>
                </div>
                <div className="card-body">
                    <form onSubmit={registerSubmit}>
                        <div className="form-group mb-3">
                            <label>Full Name : </label>
                            <input type="text" name="name" onChange={handleInput} value={registerInput.name} className="form-control" /> 
                        <span className="text-danger">{registerInput.error_list.name}</span>
                        </div>
                        <div className="form-group mb-3">
                            <label>Email ID : </label>
                            <input type="text" name="email" onChange={handleInput} value={registerInput.email} className="form-control" />  
                            <span className="text-danger">{registerInput.error_list.email}</span>
                        </div>
                        <div className="form-group mb-3">
                            <label>Password: </label>
                            <input type="password" name="password" onChange={handleInput} value={registerInput.password} className="form-control" />  
                            <span className="text-danger">{registerInput.error_list.password}</span>
                        </div>
                        <div className="form-group mb-3">
                            <button type="submit" className="btn btn-primary">Register</button>
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

export default Register;