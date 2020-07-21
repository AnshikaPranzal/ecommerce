import { API } from "../../backend";

//category calls
export const createCategory = (userId,token,category)=>{
    
    return fetch(`${API}/category/create/${userId}`,{
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}` 
        },
        body: JSON.stringify(category)
    }).then(response => {
       
        return response.json()
    })
    .catch(()=>{
        console.log("Error in Creating the Category")
    })
}

//category 
export const getCategory = ()=>{
    
    return fetch(`${API}/categories`,{
        method: "GET",
        
    }).then(response => {
       console.log(response);
        return response.json();
    })
    .catch(()=>{
        console.log("Error in getting the Categories")
    })
}

//delete a category
export const deleteCategory = (categoryId,userId,token)=>{
    
    return fetch(`${API}/category/${categoryId}/${userId}`,{
        method: "DELETE",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}` 
        }
    }).then(response => {
       
        return response.json()
    })
    .catch(()=>{
        console.log("Error in deleting the category")
    })
}
//get a category
export const getACategory = categoryId=>{
    
    return fetch(`${API}/category/${categoryId}`,{
        method: "GET",
        
    }).then(response => {
       
        return response.json()
    })
    .catch(()=>{
        console.log("Error in getting the Categories")
    })
}

export const updateCategory = (categoryId,userId,token,category)=>{
    
    return fetch(`${API}/category/${categoryId}/${userId}`,{
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}` 
        },
        body: JSON.stringify(category)
    }).then(response => {
       
        return response.json()
    })
    .catch(()=>{
        console.log("Error in updating category")
    })
}

//product calls
export const createProduct = (userId,token,product)=>{
    
    return fetch(`${API}/product/create/${userId}`,{
        method: "POST",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}` 
        },
        body: product
    }).then(response => {
       
        return response.json()
    })
    .catch(()=>{
        console.log("Error in Creating the Product")
    })
}
//get all products
export const getProduct = ()=>{
    
    return fetch(`${API}/product`,{
        method: "GET",
        
    }).then(response => {
       
        return response.json()
    })
    .catch((err)=>{
        console.log(err)
    })
}

//delete a product
export const deleteProduct = (productId,userId,token)=>{
    
    return fetch(`${API}/product/${productId}/${userId}`,{
        method: "DELETE",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}` 
        }
    }).then(response => {
       
        return response.json()
    })
    .catch(()=>{
        console.log("Error in Creating the Product")
    })
}
//get a product
export const getAProduct = productId=>{
    
    return fetch(`${API}/product/${productId}`,{
        method: "GET",
        
    }).then(response => {
       
        return response.json()
    })
    .catch(()=>{
        console.log("Error in getting the Categories")
    })
}
//update a product
export const updateProduct = (productId,userId,token,product)=>{
    
    return fetch(`${API}/product/${productId}/${userId}`,{
        method: "PUT",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}` 
        },
        body: product
    }).then(response => {
       
        return response.json()
    })
    .catch(()=>{
        console.log("Error in Creating the Product")
    })
}