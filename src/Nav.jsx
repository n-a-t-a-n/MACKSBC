import React from 'react';
import './Nav.css'
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';

function Nav() { 

  const auth = getAuth();
  const navigate = useNavigate();

  const logout = () => {signOut(auth).then(() => {
      // Sign-out successful.
      sessionStorage.removeItem('token_acesso');
      sessionStorage.removeItem('email_acesso');
      sessionStorage.removeItem('UID');
      navigate('/');
    }).catch((error) => {
      console.log(error);
      // An error happened.
    });
  }

  const email_acesso = sessionStorage.getItem('email_acesso');      
  return (
    <div className='cabecalho d-flex justify-content-center'>    
        <div className='bg-white border border-danger border-2 logo_cabecalho' >
            <img src="./Logo.png" className='h-100' alt="" />
        </div>
        <h1 className='h-100 titulo fw-bold fs-1 d-flex align-items-center justify-content-start ps-5'>SISTEMA ACADÊMICO</h1>        
        <span className='user d-flex fw-semibold fs-4 align-items-center justify-content-center '>
            <button className='btn btn-link' onClick={logout}><img src="./logout.png" className='me-2' title="Log-Out" /></button>{email_acesso}</span>
    </div>
  );
} 

export default Nav;
