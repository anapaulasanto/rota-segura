import Nav from "./components/Nav"
import Home from "./pages/Home"
import Login from "./pages/Login"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Rota from "./pages/Rota"

function App() {
  return (
    <div>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rota-segura/login" element={<Login />} />
          <Route path="/rota-segura/buscar" element={<Rota />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
