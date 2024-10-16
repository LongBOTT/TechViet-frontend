import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import HomePage from "./admin/pages/HomePage";
import NavBar from "./components/NavBar/NavBar";
import Home from "./pages/Home/Home";
import Footer from "./components/Footer/Footer";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      {/* <NavBar />

      <Home />

      <Footer /> */}
      
      <HomePage />
    </div>
  );
}

export default App;
