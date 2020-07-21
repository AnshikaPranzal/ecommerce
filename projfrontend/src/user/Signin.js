import React, { useState } from 'react';
import Base from '../core/Base';
import { Link,Redirect } from 'react-router-dom';
import { signin, authenticate, isAuthenticated } from '../auth/helper'



const SignIn =() =>{

    const [values,setValues] = useState({
        email:"182@gmail.com",
        password:"blahblah",
        error:"",
        loading: false,
        didRedirect: false
    })
    const {email, password, error, loading, didRedirect} = values;
    const {user} = isAuthenticated();

    const handleChange = name => event => {
        setValues({
            ...values,error: false, [name]: event.target.value
        })
    }

    const loadingMessage = () =>(
        loading && (<div className="row ">
                <div className="col-md-6 offset-sm-3 text-left">
                    <div className="alert alert-info" >
                        <h1>Loading...</h1>
                    </div>
                </div>
        </div>)
    )

    const errorMessage = () =>{
       
    return(
        <div className="row ">
        <div className="col-md-6 offset-sm-3 text-left">
        <div className="alert alert-danger" style={{display: error ? "" : "none"}}>
            {error}
        </div>
        </div>
        </div>
    )}

    const onSubmit = event => {
        event.preventDefault();
        setValues({
            ...values,error: false,loading: true
        })
        signin({email,password})
            .then( (data) =>{
                
                if(data.erroris){
                   
                    setValues({
                        ...values,
                        error: data.erroris,
                        loading: false
                    })
                }
                else{
                    authenticate(data,()=>{
                    setValues({
                        ...values,
                        didRedirect: true
                    })
                })
                }
            })
            .catch(console.log("Error in signin"))
    }

    const performRedirect = () => {
        if(didRedirect){
           
            if(user && user.role === 1){
                return <Redirect to="/admin/dashboard"></Redirect>
            }
            else{
                return <Redirect to="/user/dashboard"></Redirect>
            }
        }
        if(isAuthenticated()){
            return <Redirect to="/"></Redirect>
        }
    }

    const signinform =() =>{
        return(
            <div className="row mt-n5">
                <div className="col-md-6 offset-sm-3 text-left">
                <form>
                    <div className="form-group">
                        <label for="" className="text-light">Email</label>
                        <input onChange={handleChange("email")} className="form-control" value={email} type="email"></input>
                    </div>
                    <div className="form-group">
                        <label for="" className="text-light">Password</label>
                        <input onChange={handleChange("password")} className="form-control" value={password} type="password"></input>
                    </div>
                    <button onClick={onSubmit} type="submit" className="btn btn-success btn-block">Submit</button>
                </form>
                </div>
            </div>
        )
    }

    return(
        <Base title="Sign In" desc="Welcome back!! We missed You.">
            {loadingMessage()}
            {errorMessage()}
          {signinform()}
          {performRedirect()}
          <p class="text-white text-center">{JSON.stringify(values)}</p>
        </Base>
    )
}

export default SignIn