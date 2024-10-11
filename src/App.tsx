import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import NavBar from './customer/components/NavBar'
import { Banner } from './customer/components/Banner'
import CategoryMenu from './customer/components/CategoryMenu'
import { Box } from '@mui/material'
import Footer from './customer/components/Footer'

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      {/* Header */}
      <NavBar/>
      {/* Banner */}
      <Banner/>
      {/* Category */}
      <CategoryMenu/>
      <Box sx={{height:'1000px'}}>
      </Box>


      {/* Footer */}
      <Footer/>
    </div>
  );
}

export default App

