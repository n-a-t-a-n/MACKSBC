import React from 'react';
import './Form_login.css'
import { getAuth, sendPasswordResetEmail} from "firebase/auth";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


function Reset_senha() {

  const[email, setEmail] = useState('');
  const auth = getAuth();
  const navigate = useNavigate();

  const enviaEmail = () =>{

    sendPasswordResetEmail(auth, email)
        .then(() =>{

            console.log('sucesso na recuperação de usuário');
        })
        .catch(() => {
            console.log('erro na recuperação de usuário');
        })
    return;
  }

  return (
        <div className='bg-white h-50 largura_login d-flex align-items-center justify-content-start flex-column'>   
            <div className='d-flex mt-4 justify-content-start w-100 ms-5 align-items-start'>
                <button className='btn btn-light' onClick={() =>{navigate('/')}}>
                <img src="./return.png" className='' alt=""/>
                <span className='d-flex align-items-center h-100 ms-2'> Retornar</span>
                </button>
            </div>
            <img src="./Logo.png" className='w-25   ' alt=""/>
            <input type="text" onChange={(e) =>{setEmail(e.target.value)}} className='m-3 w-75 espessura_campo rounded' placeholder='Digite o email a se recuperado...' /> 
            <button className='btn botao_login w-75 m-3 text-white' onClick={() => {enviaEmail()}}>Enviar e-mail de recuperação</button>
        </div>
  );
} 

export default Reset_senha;
