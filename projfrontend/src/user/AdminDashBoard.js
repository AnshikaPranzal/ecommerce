import React from 'react';
import Base from "../core/Base"
import { isAuthenticated } from '../auth/helper';
import { Link } from 'react-router-dom';

const adminDashboard = ()=> {

  const {user: {name,email,role}} = isAuthenticated();

  const adminLeft = ()=> {
    return(
      <div className="card" >       
        <h3 className="card-header bg-dark text-white">Admin Navigation</h3>
          <ul class="list-group">
            <li class="list-group-item">
              <Link className="nav-link text-success" to="/admin/create/category">Introduce a Category</Link>
            </li>
            <li class="list-group-item">
              <Link className="nav-link text-success" to="/admin/categories">Manage Categories</Link>
            </li>
            <li class="list-group-item">
              <Link className="nav-link text-success" to="/admin/create/product">Insert Products</Link>
            </li>
            <li class="list-group-item">
              <Link className="nav-link text-success" to="/admin/products">Manage Products</Link>
            </li>
            <li class="list-group-item">
              <Link className="nav-link text-success" to="/admin/orders">Manage Orders</Link>
            </li>
           
          </ul>
        
      </div>
    )
  }

  const adminRight = () => {
    return(
      <div className="card mb-4" >       
      <h3 className="card-header">Admin Information</h3>
        <ul class="list-group">
          <li class="list-group-item">
          <span class="badge badge-success mr-2">Name:</span>{name}
          </li>
          <li class="list-group-item">
          <span class="badge badge-success mr-2">Email:</span>{email}
          </li>
          <li class="list-group-item">
          <span class="badge badge-danger mr-2">Admin Bro</span>
          </li>
        </ul>
      
    </div>
    )
  }

  return (
    <Base title="Hey Admin!! How you doing?" desc="Do your task asap!" className="container bg-success p-3"> 
        <div class="row">
          <div class="col-3">
          {adminLeft()}
          </div>
          <div class="col-9">
          {adminRight()}
          </div>
        </div>
    </Base>
  );
}

export default adminDashboard;
