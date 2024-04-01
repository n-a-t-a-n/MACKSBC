import React from 'react';
import './Form_login.css'

function Botao({ onClick }) {
  return (
    <div className=''>   
     <button onClick={onClick} className='btn' style={{'backgroundColor':'red', 'color': 'white'}}>Enviar Frequência</button>
    </div>
  );
} 

export default Botao;
