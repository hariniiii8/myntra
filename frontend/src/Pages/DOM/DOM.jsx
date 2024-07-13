import React from 'react';
import './DOM.css';
import { Link } from 'react-router-dom';

const DOM = () => {
  return (
    
    <div className="dom">
    <h1>Categories</h1>
    {localStorage.getItem('auth-token') ? <button onClick={()=>{
      localStorage.removeItem('auth-token');
      window.location.replace('/');
    }}>Logout</button> : <button><Link style={{ textDecoration: 'none' }} to='./login'>Login</Link></button>}
    
<div className="grid-items">
      <div className="grid-item"><Link style={{ textDecoration: 'none' }} to='/pants'>Pants</Link></div>
      <div className="grid-item"><Link style={{ textDecoration: 'none' }} to='/tops'>Tops</Link></div>
      <div className="grid-item"><Link style={{ textDecoration: 'none' }} to='/dresses'>Dresses</Link></div>
      <div className="grid-item"><Link style={{ textDecoration: 'none' }} to='/ethnic'>Ethnic Wear</Link></div>
      </div>
      <div className="designom">
        <h2>Check out the most trending designs</h2>
        <button><Link style={{ textDecoration: 'none' }} to='/submitdesign'>Submit your designs here!</Link></button>
      </div>
    </div>
  );
}

export default DOM;
