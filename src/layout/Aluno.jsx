import Nav from '../Nav';
import Aside from '../Aside';
import Tabela_freq from '../Tabela_freq';

function Aluno() { 

  return (
    <div className=' vh-100' style={{ backgroundColor: 'white'}}>   
        <Nav/>
        <div className='d-flex h-100'>
            <Aside/>
            <section className='d-flex w-75 justify-content-center align-items-start mt-5'> 
          <Tabela_freq/>
            </section>
        </div>
    </div>
  );
} 

export default Aluno;
