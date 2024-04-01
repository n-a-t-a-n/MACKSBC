import React from 'react';
import './Form_login.css'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


function Form_login() {

  const[email, setEmail] = useState('');
  const[pwd, setPwd] = useState('');
  const navigate = useNavigate();

  const auth = getAuth();

  // função para efetuar log in
  const login = () => {
    signInWithEmailAndPassword(auth, email, pwd)
    .then((userCredential) => {
      // Salva e-mail e token de acesso criptografado na memória da sessão do navegador
      const user = userCredential.user;
      sessionStorage.setItem('token_acesso',user.accessToken);
      sessionStorage.setItem('email_acesso',user.email);   
      sessionStorage.setItem('UID',user.uid);   
      // Após sucesso de log-in redireciona para página aluno
      navigate('/aluno');
    })
    .catch((error) => {
      console.log(error.message);
    });
  }


  return (
    <div className='bg-white h-50 largura_login d-flex align-items-center justify-content-start flex-column'>   
      <img src="./Logo.png" className='w-25 mt-5' alt=""/>
      <input type="text" onChange={(e) =>{setEmail(e.target.value)}} className='m-3 w-75 espessura_campo rounded' placeholder='Digite o usuário...' /> 
      <input type="password" onChange={(e) =>{setPwd(e.target.value)}} className='w-75  espessura_campo  rounded'placeholder='Digite a senha...' />
      <button className='btn botao_login w-75 m-3 text-white' onClick={login}>Log in</button>
      <button className='btn botao_reset w-75 text-white' onClick={() => {navigate('/reset')}}>Esqueceu sua senha ?</button> 
    </div>
  );
} 

export default Form_login;
