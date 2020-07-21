import React, { useState,useEffect } from "react";
import ImageHelper from './helper/ImageHelper';
import { Redirect } from 'react-router-dom';
import { addItemToCart, removeItemFromCart } from './helper/cartHelper';

const TestCard = ({
    product,
    addToCart = true,
    removeFromCart = false,
    setreload= f=> f,
    reload=undefined
}) => {


    const [redirect, setRedirect] = useState(false);

    const prodTitle = product ? product.name: "A Tshirt"
    const prodDesc = product ? product.description: "One of the best in our stock"
    const prodPrice = product ? product.price: "Default"

    const addProductToCart = () => {
        addItemToCart(product,()=>{
            setRedirect(true)
        })
    }

    const getARedirect = redirect =>{
        if(redirect){
            return <Redirect to="/cart"></Redirect>
        }
    }

    return (
      <div className="card text-white bg-dark border border-info ">
        <div className="card-header lead">{prodTitle}</div>
        <div className="card-body">
            {getARedirect(redirect)}
          <ImageHelper product={product}/>
          <p className="lead bg-success font-weight-normal text-wrap">
            {prodDesc}
          </p>
          <p className="btn btn-success rounded  btn-sm px-4">{prodPrice} Rs.</p>
          <div className="row">
            {addToCart && (
                <div className="col-12">
                <button
                  onClick={addProductToCart}
                  className="btn btn-block btn-outline-success mt-2 mb-2"
                >
                  Add to Cart
                </button>
              </div>
            )}
             {removeFromCart && (
                 <div className="col-12">
                 <button
                   onClick={() => {
                       removeItemFromCart(product._id)
                       setreload(!reload)
                   }}
                   className="btn btn-block btn-outline-danger mt-2 mb-2"
                 >
                   Remove from cart
                 </button>
               </div>
             )}
          </div>
        </div>
      </div>
    )
  };

  export default TestCard;