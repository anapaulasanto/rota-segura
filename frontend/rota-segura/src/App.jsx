import Nav from "./components/Nav"
import Home from "./pages/Home"
import Login from "./pages/Login"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Rota from "./pages/Rota"
import axios from "axios"
import { useState } from "react"
import { Toaster } from 'react-hot-toast';
import SignUp from "./pages/SignUp"


axios.defaults.baseURL = import.meta.env.VITE_AXIOS_BASE_URL

function App() {
  const [user, setUser] = useState(null)

  return (
    <div>
      <BrowserRouter>
        <Nav user={user}/>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rota-segura/login" element={<Login user={user} setUser={setUser} />} />
          <Route path="/rota-segura/buscar" element={<Rota />} />
          <Route path="/rota-segura/registrar" element={<SignUp setUser={setUser} />} />
        </Routes>
      </BrowserRouter>
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          style: {
            marginBottom: '20px',
          }
        }}
      />
    </div>
  )
}

export default App
