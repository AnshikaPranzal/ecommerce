import React ,{useState,useEffect} from 'react';
import Base from '../core/Base';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../auth/helper';
import { getProduct, deleteProduct } from './helper/adminapicall';

const ManageProducts = ()=> {
    const [products, setproducts] = useState([])

    const{user, token} = isAuthenticated();

    const preload = () => {
        getProduct().then(data=>{
            console.log(data)
            if(data.error)
            {
                console.log(data.error)
                // setValues({...values,error:data.error})
            }
            else{
               setproducts(data)
            }
        })
    }

    useEffect(()=>{
        preload();
    },[])

    const deleteaProduct = productId => {
        deleteProduct(productId,user._id,token).then(data=>{
            console.log(data)
            if(data.error)
            {
                console.log(data.error)
                // setValues({...values,error:data.error})
            }
            else{
               preload();
            }
        })
    }

    

  return (
    <Base title="Welcome admin" desc="Manage products here">
      <h2 className="mb-4">All products:</h2>
      <Link className="btn btn-info" to={`/admin/dashboard`}>
        <span className="">Admin Home</span>
      </Link>
      <div className="row">
        <div className="col-12">
          <h2 className="text-center text-white my-3">Total 3 products</h2>

          {products && products.map((prod,index)=>(
              <div key={index} className="row text-center mb-2 ">
              <div className="col-4">
                <h3 className="text-white text-left">{prod.name}</h3>
              </div>
              <div className="col-4">
                <Link
                  className="btn btn-success"
                  to={`/admin/product/update/${prod._id}`}
                >
                  <span className="">Update</span>
                </Link>
              </div>
              <div className="col-4">
                <button onClick={() => {
                    deleteaProduct(prod._id);
                    //we are using callback here because we are passing something
                }} className="btn btn-danger">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Base>
  );
}

export default ManageProducts;
