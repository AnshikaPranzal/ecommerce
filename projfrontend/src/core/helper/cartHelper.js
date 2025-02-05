export const addItemToCart = (item,next)=>{
    let cart = []
    if(typeof window!== undefined){
        if(localStorage.getItem("cart")){
            cart=JSON.parse(localStorage.getItem("cart"))
        }
        cart.push({
            ...item
        })
    }
    localStorage.setItem("cart",JSON.stringify(cart))
    next()
}

export const removeItemFromCart = (productId)=>{
    let cart = []
    if(typeof window!== undefined){
        if(localStorage.getItem("cart")){
            cart=JSON.parse(localStorage.getItem("cart"))
        }
        cart.map((prod,index)=>{
            
                if(productId === prod._id)
                {
                    cart.splice(index,1)
                }
            
          })
    }
    localStorage.setItem("cart",JSON.stringify(cart))
    return cart;
}

export const loadCart = () =>{
    if(typeof window!== undefined){
        if(localStorage.getItem("cart")){
            return JSON.parse(localStorage.getItem("cart"))
        }
    }
}


export const cartEmpty = next =>{
    if(typeof window!== undefined){
        localStorage.removeItem("cart")
    next()
    }
    }
