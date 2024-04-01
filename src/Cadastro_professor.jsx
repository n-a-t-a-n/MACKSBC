import React from 'react';
import { useState } from 'react';
import './Cadastro_professor.css';
import {collection, addDoc } from 'firebase/firestore'
import { getAuth, createUserWithEmailAndPassword,  } from "firebase/auth";
import {db} from './firebase-config.js'

function Cadastro_professor() {
  
  const prof = collection(db,'Professores');
  const auth = getAuth();

  const [matricula, setMatricula] = useState();
  const [professor, setProf] = useState();
  const [disciplina, setDisciplina] = useState();
  const [email, setEmail] = useState();

  const cadastraProfessor = () =>{
    createUserWithEmailAndPassword(auth, email,email).then((e) => {
      addDoc(prof, {Matricula_prof: matricula, Nome_prof: professor, Disciplina: disciplina, Email: email, Coordenador: 0, UID: e.user.uid})
      console.log('cadastro de professor teve sucesso');
    }).catch(() =>{
      console.log('cadastro de professor falhou');
    })
  }


  return (
    <div className='cadastro_form'> 
    <h2 className='cadastro_titulo fs-4 mt-3 mb-4 fw-bold'>CADASTRO DE PROFESSOR</h2>
      <div className='d-flex flex-column align-items-start ms-5 mt-2 justify-content-between h-75'>
        <input type="text" className='w-25 cadastro_campos rounded' onChange={(event) => {setMatricula(event.target.value)}}placeholder='Matrícula...' /> 
        <input type="text" className='w-75 cadastro_campos rounded' onChange={(event) => {setProf(event.target.value)}}placeholder='Professor...' /> 
        <input type="text" className='w-75 cadastro_campos rounded' onChange={(event) => {setDisciplina(event.target.value)}}placeholder='Disciplina...' /> 
        <input type="text" className='w-75 cadastro_campos rounded' onChange={(event) => {setEmail(event.target.value)}}placeholder='E-mail Professor...' /> 
        <button className='btn cadastro_botao' onClick={cadastraProfessor}> Salvar</button>
      </div>
      
    </div>
  );
} 

export default Cadastro_professor;
