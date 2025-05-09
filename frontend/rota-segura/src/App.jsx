import Nav from "./components/Nav"
import Home from "./pages/Home"
import Login from "./pages/Login"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import LoginForm from "./pages/LoginForm"

function App() {
  return (
    <div>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/rota-segura" element={<Home />} />
          <Route path="/rota-segura/login" element={<Login />} />
          <Route path="/rota-segura/loginForm" element={<LoginForm />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
