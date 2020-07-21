import React, {useState} from 'react';
import Base from '../core/Base';
import { isAuthenticated } from '../auth/helper';
import { Link } from 'react-router-dom';
import { createCategory } from './helper/adminapicall';

const AddCategory = ()=> {

    const [name, setName] = useState("")
    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false)

    const{user, token} = isAuthenticated();

    const goBack = () =>(
        
     <div className="mt-5">
         <Link className="btn btn-sm btn-success mb-3" to="/admin/dashboard">Go Back to Home</Link>
     </div>
    );

    const successMessage = () =>(
        <div className="row ">
                <div className="col-md-6 offset-sm-3 text-left">
                    <div className="alert alert-success" style={{display: success ? "" : "none"}}>
                        Category Added.
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
        const handleChange = event =>{
            setError("");
            setName(event.target.value);
            
        }
        const Submit = event =>{
            event.preventDefault();
            setError("");
            setSuccess(false);
            createCategory(user._id,token,{name})
            .then( data =>{
               
                if(data.error){
                    setError(data.error)
                }
                else{
                    setError("");
                    setSuccess(true);
                    setName("")
                }
            })
            .catch(()=>{
                console.log("Error in creating category")
            })
        }

    const catForm =() =>(
        <form className="my-3">
            <div className="form-group ">
                <label for="" className="lead">Enter the category name</label>
                <input className="form-control my-3" autoFocus required placeholder="For Ex. Summer" type="text" onChange={handleChange} value={name}></input>
            </div>
            <button type="submit" onClick={Submit} className="btn btn-outline-info">Create Category</button>

        </form>
    );
  return (
    <Base title="Create a Category" desc="Some new Stocks coming up?? Excited!!" className="container bg-info p-4">
      <div class="row bg-white rounded">
            <div class="col-md-8 offset-md-2">
                {successMessage()}
                {errorMessage()}
                {catForm()}
                {goBack()}
            </div>
       </div>
    </Base>
  );
}

export default AddCategory;
