import React,{useEffect,useState} from 'react';
import '../styles.css'
import { API } from '../backend';
import Base from './Base';
import Card from './Card';
import getProducts from './helper/coreapicalls';
import { isAuthenticated } from '../auth/helper';

function Home() {
    const user = isAuthenticated()
    console.log(user)
  const [product, setproduct] = useState([])
  const [error, seterror] = useState(false)


  const loadAllProducts = () =>{
    getProducts().then(data =>{
      if(data.error){
        seterror(data.error)
      }
      else{
        setproduct(data)
      }
    })
  }

  useEffect (() => {
    loadAllProducts()
    },[])

  return (    
    <Base title="Home Page" desc="Welcome to my Store">
     
        <div className="row text-center">
        <h1 className="text-white mb-2">Feel Free to look around</h1></div>
        <div className="row">
          {product.map((prod,index)=>{
            return(
            <div key={index} className="col-4 mb-4">
              <Card product={prod}/>
            </div>
            )
          })}
        </div>
        
      
    </Base>
  );
}

export default Home;
