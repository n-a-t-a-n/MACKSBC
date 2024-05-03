import React, { useEffect, useState } from 'react';
import {collection, getDocs, query, where, getCountFromServer} from 'firebase/firestore'
import {db} from './firebase-config.js'
import axios from 'axios'; // Import Axios for making HTTP requests
import Botao from './Botao.jsx';

function Tabela_freq() {


  const sendEmail = async () => {

    dadosAluno.map((conteudo,index) =>{      
        console.log(conteudo.Email_resp);

      if (
      ( (dadosFreqAluno[conteudo.Matricula] / 
          (dadosFreqAluno[conteudo.Matricula] + dadosNFreqAluno[conteudo.Matricula])) < 0.7) |
      ((dadosFreqAluno[conteudo.Matricula] === undefined & 
      dadosNFreqAluno[conteudo.Matricula] !== undefined) == true)
    ){
        try {
          axios.post("https://us-central1-sistema-presenca-mack.cloudfunctions.net/sendEmail", { 
            to: conteudo.Email_resp, 
            aluno: conteudo.Nome_aluno,
            resp: conteudo.Nome_resp
          });
          console.log('OK');
        } catch (error) {
          console.error('Error sending email:', error);
        } 
        }
      }
    )
  }

  /* Variável de estado que armazena todos os alunos do banco */  
    const [dadosAluno, setDadosAluno] = useState([]);   
    const [dadosFreqAluno, setDadosFreqAluno] = useState([]);   
    const [dadosNFreqAluno, setDadosNFreqAluno] = useState([]);   
    const [dadosFreq, setDadosFreq] = useState([]);   
    const [dadosNFreq, setDadosNFreq] = useState([]);   
  
  /* Referências o banco (collection) do firestore */  
  const alunos = collection(db,'Alunos');     
  const freqs = collection(db,'Frequencia');   
  
  /* Referência o banco (collection) do firestore */  
  useEffect(() => {
    
    const chamaAluno = async () =>{
        const aluno = await getDocs(alunos);

        aluno.docs.map(doc => {
          setDadosAluno(prevState => [...prevState, doc.data()]);        
        });
        return
    }
    chamaAluno();    

    const chamaFreq = async () =>{
      
      const q = query(freqs, where("Presenca", "==", "sim"));
      const q_n = query(freqs, where("Presenca", "==", "nao"));
      const freq = await getDocs(q);
      const freq_n = await getDocs(q_n);
   
      freq.docs.map(doc => {
        setDadosFreq(prevState => [...prevState, doc.data()]);        
      });
   
      freq_n.docs.map(doc => {
        setDadosNFreq(prevState => [...prevState, doc.data()]);        
      });
      
        return;
    }
    chamaFreq();            
      
  },[]) 

  useEffect(() =>{

    const presenca = 
    dadosFreq.length > 0 ?     
      dadosFreq.reduce((accumulador, item) => {
        accumulador[item.Matricula] = (accumulador[item.Matricula] || 0) + 1;
        return accumulador;
    }, {}) :  {};
    setDadosFreqAluno(presenca);    
    
    const Npresenca = 
    dadosFreq.length > 0 ?     
      dadosNFreq.reduce((accumulador, item) => {
        accumulador[item.Matricula] = (accumulador[item.Matricula] || 0) + 1;
        return accumulador;
    }, {}) :  {};
    setDadosNFreqAluno(Npresenca);    

  },[dadosFreq,dadosNFreq])

  return (
    <div className='h-100 w-75 overflow-scroll'>
      <table className="table table-striped table-secondary">
        <thead>
            <tr>
                <th>Matricula</th>
                <th>Nome</th>
                <th>Frequência</th>
                <th>Total de aulas</th>
                <th>Faltas</th>
            </tr>
        </thead>

        <tbody>
          {dadosAluno.map((conteudo,index) =>(
              <tr>
                  <td>{conteudo.Matricula}</td>
                  <td>{conteudo.Nome_aluno}</td>
                  <td>{/*dadosFreqAluno[conteudo.Matricula] + '-' + dadosNFreqAluno[conteudo.Matricula]*/
                  dadosFreqAluno[conteudo.Matricula] === undefined & 
                      dadosNFreqAluno[conteudo.Matricula] !== undefined ? 
                        'Apenas Faltas' : 
                        dadosFreqAluno[conteudo.Matricula] !== undefined & 
                            dadosNFreqAluno[conteudo.Matricula] === undefined ? 
                            '100%' :
                            dadosFreqAluno[conteudo.Matricula] / (dadosFreqAluno[conteudo.Matricula] ?? 0) + (dadosNFreqAluno[conteudo.Matricula] ?? 0) 
                                   > 1 ? '100%' :
                  (dadosFreqAluno[conteudo.Matricula] / (dadosFreqAluno[conteudo.Matricula] + dadosNFreqAluno[conteudo.Matricula])) * 100 + "%"
                }</td>
                  <td>{(dadosFreqAluno[conteudo.Matricula] ?? 0) + (dadosNFreqAluno[conteudo.Matricula] ?? 0)  }</td>
                  <td>{(dadosNFreqAluno[conteudo.Matricula] ?? 0)  }</td>
              </tr>
            ))
          }
        </tbody>
      </table>
              <Botao onClick={() =>{sendEmail()}}> </Botao>
    </div>
  );
} 

export default Tabela_freq;
