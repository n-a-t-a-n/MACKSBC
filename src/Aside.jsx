import React, { useState } from 'react';
import './Aside.css';
import Nav from 'react-bootstrap/Nav';

function Aside() { 

  const [imagens, SetImagens] = useState([
    "./icone.png",
    "./icone.png",
    "./icone.png",
  ])
  
  const selecionaImagem = (indice) => {
    const  imagensNova = [...imagens];
    imagensNova[indice] = "./icone_sel.png";
    SetImagens(imagensNova);
  }
  
  const retornaImagem = (indice) => {
    const  imagensNova = [...imagens];
    imagensNova[indice] = "./icone.png";
    SetImagens(imagensNova);
  }


  return (
    <aside className='menu h-100 border border-danger border-2'>    
        <span className='fw-semibold fs-4 text-white d-flex justify-content-start ps-5 mb-4 mt-2'>
          <img src='./Home.png'className="me-2"alt="" />          
          Bem-vindo!
        </span>

        <div className='bg-white h-25 d-flex flex-column justify-content-center'>
            <Nav.Link href='/registro'className='fw-semibold menu_texto my-2 fs-3 d-flex justify-content-start ps-3' 
                  onMouseOver={() => selecionaImagem(0)} onMouseOut={() => retornaImagem(0)} >
                <img src={imagens[0]}className="me-2"alt="" />
                Registro
            </Nav.Link>
            <Nav.Link href='/presenca' className='fw-semibold menu_texto my-2 fs-3 d-flex justify-content-start ps-3'
                  onMouseOver={() => selecionaImagem(1)} onMouseOut={() => retornaImagem(1)} > 
                  <img src={imagens[1]}className="me-2"alt="" />
              Frequência
            </Nav.Link>
            <Nav.Link href='/aluno' className='fw-semibold menu_texto my-2 fs-3 d-flex justify-content-start ps-3'
                  onMouseOver={() => selecionaImagem(2)} onMouseOut={() => retornaImagem(2)} > 
                  <img src={imagens[2]}className="me-2"alt="" />
              Alunos
            </Nav.Link>
        </div>
    
    </aside>
  );
} 

export default Aside;
