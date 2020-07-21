import React,{ useState,useEffect} from 'react';
import { loadCart } from './cartHelper';
import Base from '../Base';
import Card from '../Card';
import Payment from '../Payment';

const Cart = () => {
    
  const [product, setproduct] = useState([])
  const [error, seterror] = useState(false)
    const [reload, setreload] = useState(false)
    
  const loadAllProducts = (product) =>{
    
  return(
      <div><h1>allll prods babyy</h1>
      {product.map((prod,index)=>{
            return(
            <div key={index} >
              <Card product={prod}
              addToCart={false}
              removeFromCart={true}
              setreload={setreload}
              reload={reload}
              />
            </div>
            )
          })}
      </div>
  );
  }
  
  useEffect(()=>{setproduct(loadCart());},[reload]);

  const loadCheckout = () =>{
      return(
      
    <div>
        <h1>for checkout</h1>
    </div>
  );}



  return (    
    <Base title="Cart Page" desc="Yayy..Hope you chose the best!!">
     
        <div className="row text-center">
            <div className="col-6 ">
            
              {loadAllProducts(product)}
           
            </div>
            <div className="col-6 "><Payment products={product} setreload={setreload}></Payment></div>
         
        </div>
        
      
    </Base>
  );
}

export default Cart;
