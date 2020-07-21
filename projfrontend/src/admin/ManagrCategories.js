import React ,{useState,useEffect} from 'react';
import Base from '../core/Base';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../auth/helper';
import { getcatuct, deleteCategory, getCategory } from './helper/adminapicall';

const ManageCategories = ()=> {
    const [Categories, setCategories] = useState([])

    const{user, token} = isAuthenticated();

    const preload = () => {
        getCategory().then(data=>{
            console.log(data)
            if(data.error)
            {
                console.log(data.error)
                // setValues({...values,error:data.error})
            }
            else{
               setCategories(data)
            }
        })
    }

    useEffect(()=>{
        preload();
    },[])

    const deleteaCategory = catuctId => {
        deleteCategory(catuctId,user._id,token).then(data=>{
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
    <Base title="Welcome admin" desc="Manage Categories here">
      <h2 className="mb-4">All Categories:</h2>
      <Link className="btn btn-info" to={`/admin/dashboard`}>
        <span className="">Admin Home</span>
      </Link>
      <div className="row">
        <div className="col-12">
          <h2 className="text-center text-white my-3">Total 3 Categories</h2>

          {Categories && Categories.map((cat,index)=>(
              <div key={index} className="row text-center mb-2 ">
              <div className="col-4">
                <h3 className="text-white text-left">{cat.name}</h3>
              </div>
              <div className="col-4">
                <Link
                  className="btn btn-success"
                  to={`/admin/category/update/${cat._id}`}
                >
                  <span className="">Update</span>
                </Link>
              </div>
              <div className="col-4">
                <button onClick={() => {
                    deleteaCategory(cat._id);
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

export default ManageCategories;
