import Nav from './Nav.jsx';
import Aside from './Aside.jsx';
import Tabela_aluno from './Tabela_aluno.jsx';
import Data from './Data.jsx';
import Botao from './Botao.jsx';
import {deleteDoc, addDoc, doc, query, where, getDocs,collection} from 'firebase/firestore'
import {db} from './firebase-config.js'
import React, { useState, useEffect } from 'react';

function Presenca() {   

  
  /* Variável identificadora de usuário (professor) */  
  const uid = sessionStorage.getItem('UID');  
  
  /* Variável de estado que a disciplina do professor que esta logado para registrar presenca */  
  const [disciplina, setDisciplina] = useState();

  const[dadosAlunoPresenca, setDadosAlunoPresenca] = useState([]);
  
  const freq = collection(db,'Frequencia');  
  const prof = collection(db,'Professores');   

  const hoje = new Date().toLocaleDateString()

  const enviaFrequencia = () =>{

    const q = query(freq, where("Data_presenca", "==", hoje), where("Disciplina", "==", disciplina));

        const deleta = async() => {await getDocs(q).then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            deleteDoc(doc.ref)
          });      

      }).catch(() =>{console.log('vazio')})
    }
    
    deleta().then(() => {
        dadosAlunoPresenca.map((conteudo, index) =>{
          addDoc(freq, {
            Data_presenca: hoje,
            Matricula: conteudo.Matricula, 
            Email_resp: conteudo.Email_resp, 
            Nome_aluno: conteudo.Nome_aluno,
            Disciplina: disciplina,
            Nome_resp: conteudo.Nome_resp,
            Presenca: conteudo.presenca})    
        })})
  }

  useEffect(() =>{
    
    const q_disc = query(prof, where("UID", "==", uid));
    
    const salvaDisciplina = async() => {await getDocs(q_disc).then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          setDisciplina(doc.data().Disciplina);
        });      
      }).catch(() =>{console.log('erro disciplina')})
    }
    
    salvaDisciplina()

  },[])


  return (
    <div className=' vh-100' style={{ backgroundColor: 'white'}}>   
        <Nav/>
        <div className='d-flex h-100'>
            <Aside/>
            <div className='d-flex ms-5 w-75 h-75 flex-column justify-content-center align-items-center'>
              <Data/>
              <section className='d-flex w-100 h-100 overflow-scroll justify-content-center align-items-start mt-5'> 
              <Tabela_aluno setDadosPresenca={setDadosAlunoPresenca}/>
              </section>
              <Botao onClick={() =>{enviaFrequencia()}}> </Botao>
            </div>
        </div>
    </div>
  );
} 

export default Presenca;
