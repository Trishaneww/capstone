import './App.css';
import Homepage from './components/homepage/Homepage';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Viewdeck from './components/Viewdeck'
import Login from './components/Login'
import Signup from './components/Signup'
import Settings from './components/settings/Settings'

function App() {
  return (

    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path='/' element={<Homepage />}/>
          <Route path='/settings' element={<Settings />}/>
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/deck/:id' element={<Viewdeck />} />
        </Routes>
      </div>  
    </BrowserRouter>
  );
}

export default App;
