import React, { useEffect, useState } from 'react';
import {collection, getDocs, where, getCountFromServer, query} from 'firebase/firestore'
import {db} from './firebase-config.js'

function Tabela_freq() {


  /* Variável de estado que armazena todos os alunos do banco */  
    const [dadosAluno, setDadosAluno] = useState([]);   

  /* Variável de estado que a disciplina do professor que esta logado para registrar presenca */  
  const [disciplina, setDisciplina] = useState(); 

  
  /* Referências o banco (collection) do firestore */  
  const alunos = collection(db,'Alunos');     
  const freq = collection(db,'Frequencia');   
  
  /* Referência o banco (collection) do firestore */  
  useEffect(() => {
    
    const chamaAluno = async () =>{
        const aluno = await getDocs(alunos);

        aluno.docs.map(doc => {
          setDadosAluno(prevState => [...prevState, doc.data()]);        
        });
        return
    }
    chamaAluno()    
      
  },[])

  
  useEffect(() =>{


    

    /*
    dadosAluno.map((conteudo,index) => {
              const q_total = query(freq, where('Matricula', '==', conteudo.Matricula), where('Disciplina', '==',  disciplina));

        const q_presenca = query(freq, where('Matricula', '==', conteudo.Matricula), where('Disciplina', '==',  disciplina), 
                              where('Presenca', '==', 'sim'));                           

      getCountFromServer(q_total)
      .then((e) =>{
          setDadosAluno(prevItems => {
              const arrayTmp = [...dadosAluno]; 
              arrayTmp[index] = { ...arrayTmp[index], totalDias: e.data().count }; 
              return arrayTmp; 
          });
      })

      getCountFromServer(q_presenca)
      .then((e) =>{
          setDadosAluno(prevItems => {
              const arrayTmp = [...dadosAluno]; 
              arrayTmp[index] = { ...arrayTmp[index], presencaDias: e.data().count }; 
              return arrayTmp; 
          });
      })     

    })*/

  },[])
  


  return (
    <div className='h-100 w-75 overflow-scroll'>
      <table className="table table-striped table-secondary">
        <thead>
            <tr>
                <th>Matricula</th>
                <th>Nome</th>
                <th>Frequência</th>
                <th>Email</th>
            </tr>
        </thead>

        <tbody>
          {dadosAluno.map((conteudo,index) =>(
              <tr>
                  <td>{conteudo.Matricula}</td>
                  <td>{conteudo.Nome_aluno}</td>
                  <td> </td>
                  <td> </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
} 

export default Tabela_freq;
