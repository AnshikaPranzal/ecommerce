import React, {useState,useEffect} from 'react';
import Base from '../core/Base';
import { isAuthenticated } from '../auth/helper';
import { Link } from 'react-router-dom';
import { getAProduct,  updateProduct, getCategory } from './helper/adminapicall';

const UpdateProduct = ({match})=> {

    const [values, setValues] = useState({
        name:"",
        description:"",
        price:"",
        stock:"",
        photo:"",
        categories:[],
        category:"",
        loading:false,
        error:"",
        getRedirect: false,
        createdProduct:"",
        formData:""
    })
    
    const { name,description,price, stock,photo,categories,category,loading,error,getRedirect,createdProduct,formData} = values;
    const{user, token} = isAuthenticated();

    const preload = (productId) => {
        getAProduct(productId).then(data=>{
            console.log(data)
            if(data.error)
            {
                setValues({...values,error:data.error})
            }
            else{
                preloadCat();
                setValues({...values,
                    name:data.name,
                    description:data.description,
                    price:data.price,
                    stock:data.stock,
                    // photo:data.photo,
                    category: data.category._id,
                    formData: new FormData()
                });
                 
            }
        })
    }

    const preloadCat =()=>{
        getCategory().then(data=>{
            console.log(data)
            if(data.error)
            {
                setValues({...values,error:data.error})
            }
            else{
                setValues({categories: data, formData: new FormData()})
            }
        })
    }

    useEffect(()=>{
        preload(match.params.productId);
    },[])

    const goBack = () =>(
        
     <div className="mt-5">
         <Link className="btn btn-sm btn-success mb-3" to="/admin/dashboard">Go Back to Home</Link>
     </div>
    );

    const successMessage = () =>{
        console.log(createdProduct)
        return(
        <div className="row ">
                <div className="col-md-6 offset-sm-3 text-left">
                    <div className="alert alert-success" style={{display: createdProduct ? "" : "none"}}>
                        Updated in DB.
                    </div>
                </div>
        </div>
    )}

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
        const handleChange = name=> event =>{
            const v = name === "photo"? event.target.files[0]:event.target.value

            formData.set(name,v)
             setValues({...values,[name]:v});
            
        }
        
        const Submit = event =>{
            event.preventDefault();
            setValues({...values,error:"",loading: true})
            updateProduct(match.params.productId,user._id,token,formData)
            .then( data =>{
               
                if(data.error){
                    setValues({...values,error:data.error})
                }
                else{
                    setValues({
                        ...values,
                        name:"",
                        description:"",
                        price:"",
                        stock:"",
                        photo:"",
                        loading:false,
                        createdProduct: true,
                    })
                }
            })
            .catch(()=>{
                console.log("Error in creating Product")
            })
        }

    const catForm =() =>(
        <form >
        <span>Post photo</span>
        <div className="form-group">
          <label className="btn btn-block btn-success">
            <input
              onChange={handleChange("photo")}
              type="file"
              name="photo"
              accept="image"
              placeholder="choose a file"
            />
          </label>
        </div>
        <div className="form-group">
          <input
            onChange={handleChange("name")}
            name="photo"
            className="form-control"
            placeholder="Name"
            value={name}
          />
        </div>
        <div className="form-group">
          <textarea
            onChange={handleChange("description")}
            name="photo"
            className="form-control"
            placeholder="Description"
            value={description}
          />
        </div>
        <div className="form-group">
          <input
            onChange={handleChange("price")}
            type="number"
            className="form-control"
            placeholder="Price"
            value={price}
          />
        </div>
        <div className="form-group">
          <select
            onChange={handleChange("category")}
            className="form-control"
            placeholder="Category"
          >
            <option>Select</option>
            {categories && 
            categories.map((cat,index)=>(
                <option key={index} value={cat._id}>{cat.name}</option>
            ))
            }
          </select>
        </div>
        <div className="form-group">
          <input
            onChange={handleChange("stock")}
            type="number"
            className="form-control"
            placeholder="Stock"
            value={stock}
          />
        </div>
        
        <button type="submit" onClick={Submit} className="btn btn-outline-success">
          Update Product
        </button>
      </form>
    );
  return (
    <Base title="Add a Product" desc="Each product help us grow even better!!!" className="container bg-info p-4">
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

export default UpdateProduct;
