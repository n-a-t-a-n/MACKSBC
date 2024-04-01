import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Registro from './Registro';
import Presenca from './Presenca';
import Aluno from './Aluno';
import Reset from './Reset';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
            <Route path='/' element={<Login/>}></Route>
            <Route path='/registro' element={<Registro/>}></Route>
            <Route path='/presenca' element={<Presenca/>}></Route>
            <Route path='/aluno' element={<Aluno/>}></Route>
            <Route path='/reset' element={<Reset/>}></Route>
        </Routes>        
      </BrowserRouter>
    </div>
  );
} 

export default App;
