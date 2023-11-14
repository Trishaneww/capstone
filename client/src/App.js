import './App.css';
import Test from './components/Test';
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (

    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path='/' element={<Test />}/>
        </Routes>
      </div>  
    </BrowserRouter>
  );
}

export default App;
