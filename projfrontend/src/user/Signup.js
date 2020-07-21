import React, { useState } from 'react';
import Base from '../core/Base';
import { Link } from 'react-router-dom';
import { signup } from '../auth/helper'


const SignUp =() =>{

    const [values,setValues] = useState({
        name:"",
        email:"",
        password:"",
        error:"",
        success: false
    })
    const {name, email, password, error, success} = values;

    const handleChange = name => event => {
        setValues({
            ...values,error: false, [name]: event.target.value
        })
    }

    const onSubmit = event => {
        event.preventDefault();
        setValues({
            ...values,error: false
        })
        signup({name,email,password})
            .then( (data) =>{
                
                if(data.erroris){
                   
                    setValues({
                        ...values,
                        error: data.erroris,
                        success: false
                    })
                }
                else{
                    setValues({
                        ...values,
                        name:"",
                        email:"",
                        password:"",
                        error:"",
                        success: true
                    })
                }
            })
            .catch(console.log("Error in signup"))
    }

    const successMessage = () =>(
        <div className="row ">
                <div className="col-md-6 offset-sm-3 text-left">
                    <div className="alert alert-success" style={{display: success ? "" : "none"}}>
                        Congratulations!!!You are registered with us. Start now{" "}<Link to="/signin">here</Link>
                    </div>
                </div>
        </div>
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

    const signupform =() =>{
        return(
            <div className="row ">
                <div className="col-md-6 offset-sm-3 text-left">
                <form>
                    <div className="form-group">
                        <label for="" className="text-light">Name</label>
                        <input className="form-control" onChange={handleChange("name")} type="text" value={name}></input>
                    </div>
                    <div className="form-group">
                        <label for="" className="text-light">Email</label>
                        <input className="form-control" onChange={handleChange("email")} type="email" value={email}></input>
                    </div>
                    <div className="form-group">
                        <label for="" className="text-light">Password</label>
                        <input className="form-control" onChange={handleChange("password")} type="password" value={password}></input>
                    </div>
                    <button type="submit" onClick={onSubmit} className="btn btn-success btn-block">Submit</button>
                </form>
                </div>
            </div>
        )
    }
    return(
        <Base title="Sign Up" desc="Join us here!!">
            {successMessage()}
            {errorMessage()}
            {signupform()}
            <p class="text-white text-center">{JSON.stringify(values)}</p>
        </Base>
    )
}

export default SignUp