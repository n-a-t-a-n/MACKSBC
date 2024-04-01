import React, { useEffect, useState } from 'react';
import {collection, getDocs, where, getCountFromServer, query} from 'firebase/firestore'
import {db} from './firebase-config.js'

function Tabela_aluno({setDadosPresenca}) {

  /* Variável de estado que armazena todos os alunos do banco */  
    const [dadosAluno, setDadosAluno] = useState([]);    
    
      /* Referência o banco (collection) do firestore */  
  const alunos = collection(db,'Alunos');       
  const freq = collection(db,'Frequencia');
  
  /* Referência o banco (collection) do firestore */  
  useEffect(() => {
    
    const chamaAluno = async () =>{
        const aluno = await getDocs(alunos);

        aluno.docs.map(doc => {
          setDadosAluno(prevState => [...prevState, doc.data()]);        
        });
       // return
    }
    chamaAluno();
    
  },[])
  

  useEffect(() =>{
    setDadosPresenca(dadosAluno);
  },[dadosAluno])

  return (
    <div className='h-100 w-100'>
      <table className="table table-striped table-secondary">
        <thead>
            <tr>
                <th>Matricula</th>
                <th>Nome</th>
                <th>Presença</th>
            </tr>
        </thead>

        <tbody>
          {dadosAluno.map((conteudo,index) =>(
              <tr key={index}>
                  <td>{conteudo.Matricula}</td>
                  <td>{conteudo.Nome_aluno}</td>
                  <td>                    
                    <select name="presenca" defaultValue='' onChange={(event) => {
                        //funcao para adicionar novo atributo em um elemento (objeto) especifico do state array dadosAluno
                        setDadosAluno(prevData => {
                          // Copia o state arraty
                          const newData = [...prevData];
                          // Adiciona o novo atributo
                          newData[index] = { ...newData[index], presenca: event.target.value };
                          // Retorna o novo array para ser atribuido ao setDadosAluno
                          return newData;
                      })}} id="">
                      <option value="sim">Sim</option>
                      <option value="nao">Não</option>
                      <option disabled value='' hidden></option>
                    </select>
                  </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
} 

export default Tabela_aluno;
