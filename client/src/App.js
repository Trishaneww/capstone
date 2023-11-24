import Homepage from './components/homepage/Homepage';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Viewdeck from './components/Viewdeck'
import Login from './components/Login'
import Signup from './components/Signup'
import Settings from './components/settings/Settings'
import Test from './components/Test'
import Addpage from './components/addpage/Addpage'
import Reviewdeck from './components/reviewDeck/Reviewdeck'
import Editdeck from './components/editDeck/Editdeck'

function App() {

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='/settings/:id' element={<Settings />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/test' element={<Test />} />
          <Route path='/deck/:id' element={<Viewdeck />} />
          <Route path="/add/:id" element={<Addpage />} />
          <Route path="/review/:id" element={<Reviewdeck/>} />
          <Route path="/editdeck/:id" element={<Editdeck/>} />
        </Routes>
      </div>  
    </BrowserRouter>
  );
}

export default App;
