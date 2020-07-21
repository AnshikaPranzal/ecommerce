import React from 'react';
import {BrowserRouter,Switch,Route} from 'react-router-dom';
import Home from './core/Home';
import SignUp from './user/Signup';
import SignIn from './user/Signin';
import AdminRoute from './auth/helper/AdminRoutes';
import PrivateRoute from './auth/helper/PrivateRoutes';
import userDashboard from './user/UserDashBoard';
import adminDashboard from './user/AdminDashBoard';
import AddCategory from './admin/AddCategory';
import ManageCategories from './admin/ManagrCategories';
import AddProduct from './admin/AddProduct';
import ManageProducts from './admin/ManageProducts';
import UpdateProduct from './admin/UpdateProduct';
import UpdateCategory from './admin/UpdateCategories';
import Cart from './core/helper/Cart';

function Routes() {
  return (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Home}></Route>
            <Route path="/signup" component={SignUp}></Route>
            <Route path="/signin" component={SignIn}></Route>
            <Route path="/cart" component={Cart}></Route>

            <PrivateRoute exact path="/user/dashboard" component={userDashboard}></PrivateRoute>
            <AdminRoute exact path="/admin/dashboard" component={adminDashboard}></AdminRoute>
            <AdminRoute exact path="/admin/create/category" component={AddCategory}></AdminRoute>
            <AdminRoute exact path="/admin/create/product" component={AddProduct}></AdminRoute>
            <AdminRoute exact path="/admin/products" component={ManageProducts}></AdminRoute>
            <AdminRoute exact path="/admin/orders" component={adminDashboard}></AdminRoute>
            <AdminRoute exact path="/admin/categories" component={ManageCategories}></AdminRoute>
            <AdminRoute exact path="/admin/product/update/:productId" component={UpdateProduct}></AdminRoute>
            <AdminRoute exact path="/admin/category/update/:categoryId" component={UpdateCategory}></AdminRoute>


        </Switch>
    </BrowserRouter>
  );
}

export default Routes;
