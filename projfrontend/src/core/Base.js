import React from 'react';
import Nav from './Nav';

function Base({
    title="My title",
    desc="Descriptions are important",
    className="bg-dark text-white p-4",
    children
}) {
  return (
    <div>
          <Nav />
          <div className="container-fluid">
            <div className="jumbotron bg-dark text-white text-center myfix" >
                    <h2 className="display-4">{title}</h2>
                    <p className="lead">{desc}</p>
            </div>
            <div className={className}>{children}</div> 
          </div>
          <footer className="footer bg-dark mt-auto py-1">
                <div className="container-fluid bg-success text-white text-center py-3">
                    <h4>Contact us for queries anyytime</h4>
                    <button className="btn btn-warning btn-lg">Contact Us</button>
                </div>
                <div className="container">
                    <span className="text-muted">An amazing <span class="text-white">Shopping</span> place</span>
                </div>
            </footer>
    </div>
  );
}

export default Base;
