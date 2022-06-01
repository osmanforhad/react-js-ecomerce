import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Route, Redirect, useHistory } from 'react-router-dom'
import swal from 'sweetalert'
import MasterLayout from './layouts/admin/MasterLayout'

const AdminPrivateRoute = ({...rest}) => {

    const history = useHistory();
    const [Authenticated, setAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        axios.get(`/api/checkingAuthenticated`).then(response => {
            if(response.status === 200){
                setAuthenticated(true);
            }
            setLoading(false);
        });
    
      return () => {
        setAuthenticated(false);
      };
    }, []);

    axios.interceptors.response.use(undefined, function axiosRetryInterceptor(error) {
        if(error.response.status === 401){
            swal("Unauthorized", error.response.data.message, "warning");
            history.push("/");
        }
        return Promise.reject(error);
    });
    

    if(loading){
        return <h1 className="text-center">Loading...</h1>
    }

  return (
    <Route {...rest}
    render={ ({props, location}) => 
    Authenticated ?
    ( <MasterLayout {...props} />  ) :
    ( <Redirect to={{pathname: "/login", state: {from: location} }} /> )

    }
     />
  )
}

export default AdminPrivateRoute