import React, { useState } from 'react';
import './Cadastro_aluno.css';
import {collection, addDoc, query, where, deleteDoc, getDocs} from 'firebase/firestore'
import {db} from './firebase-config.js'

function Cadastro_aluno() {
  
  const alunos = collection(db,'Alunos');
  const freq = collection(db,'Frequencia');

  const [matricula, setMatricula] = useState();
  const [matriculaDel, setMatriculaDel] = useState();
  const [aluno, setAluno] = useState();
  const [resp, setResp] = useState();
  const [emailResp, setEmailResp] = useState();

  const cadastraAluno = () =>{
    addDoc(alunos, {Matricula: matricula, Email_resp: emailResp, Nome_aluno: aluno, Nome_resp: resp})
  }
    
  const deletaAluno = async() => {
    const q_aluno = query(alunos, where("Matricula", "==", matriculaDel));
    const q_freq = query(freq, where("Matricula", "==", matriculaDel));

    await getDocs(q_aluno).then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          deleteDoc(doc.ref)
        });
    }).catch(() =>{console.log('vazio')})

    await getDocs(q_freq).then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          deleteDoc(doc.ref)
        });
    }).catch(() =>{console.log('vazio')})
  }


  return (
    <div className='cadastro_form'> 
    <h2 className='cadastro_titulo mx-auto fs-4 mt-3 mb-4 fw-bold'>CADASTRO DE ALUNO</h2>
      <div className='d-flex flex-column align-items-start ms-5 mt-2 justify-content-between h-75'>
        <input type="text" className='w-25 cadastro_campos rounded' onChange={(event) => {setMatricula(event.target.value)}}placeholder='Matrícula...' /> 
        <input type="text" className='w-75 cadastro_campos rounded' onChange={(event) => {setAluno(event.target.value)}}placeholder='Aluno...' /> 
        <input type="text" className='w-75 cadastro_campos rounded' onChange={(event) => {setResp(event.target.value)}}placeholder='Responsável...' /> 
        <input type="text" className='w-75 cadastro_campos rounded' onChange={(event) => {setEmailResp(event.target.value)}}placeholder='E-mail esponsável...' /> 
        <button className='btn cadastro_botao' onClick={cadastraAluno}> Salvar</button>
        <h2 className='cadastro_titulo mx-auto fs-4 mt-3 mb-4 fw-bold'>EXCLUSÃO DE ALUNO</h2>    
        <input type="text" className='w-25 cadastro_campos rounded' onChange={(event) => {setMatriculaDel(event.target.value)}}placeholder='Matrícula...' /> 
        <button className='btn cadastro_botao' onClick={() => {deletaAluno()}}>Excluir</button>
      </div>      
    </div>
  );
} 

export default Cadastro_aluno;
