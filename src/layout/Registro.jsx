import React from 'react';
import Nav from '../Nav';
import Aside from '../Aside';
import Cadastro_aluno from '../Cadastro_aluno';
import Cadastro_professor from '../Cadastro_professor';
function Registro() { 


  return (
    <div className=' vh-100' style={{ backgroundColor: 'white'}}>       
        <Nav/>
        <div className='d-flex h-100' >
            <Aside/>
            <div className='d-flex ms-5 h-75 w-75 justify-content-between align-items-center'>
                <Cadastro_aluno/>
                <Cadastro_professor/>
            </div>
        </div>
    </div>
  );
} 

export default Registro;
