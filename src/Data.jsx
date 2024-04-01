import './Cadastro_aluno.css';
function Data() {
    
  const data = new Date();
  
  let dia = '';

    if(data.getDay() == 0){
        dia = 'DOMINGO'
    }
    else if(data.getDay() == 1){
        dia = 'SEGUNDA'
    }
    else if(data.getDay() == 2){
        dia = 'TERÇA'
    }
    else if(data.getDay() == 3){
        dia = 'QUARTA'
    }
    else if(data.getDay() == 4){
        dia = 'QUINTA'
    }
    else if(data.getDay() == 5){
        dia = 'SEXTA'
    }
    else if(data.getDay() == 6){
        dia = 'SÁBADO'
    }
  
  return (
    <div style={{'alignSelf': 'flex-start'}}> 
        <h3 style={{'color':'red', 'marginTop': '2vh'}}>
            DATA: {data.toLocaleDateString()} {dia}
        </h3>
    </div>
  );
} 

export default Data;
