import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import NavBar from './components/NavBar/NavBar'
import { Banner } from './pages/Home/Banner'
import CategoryMenu from './pages/Home/CategoryMenu'
import { Box } from '@mui/material'
import Footer from './components/Footer/Footer'
import Home from './pages/Home/Home'


function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <NavBar/>
      <Home/>
      <Footer/>
      {/* <HomePage /> */}

    </div>
  );
}

export default App;
