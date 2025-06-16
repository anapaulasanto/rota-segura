import Nav from "./components/Nav"
import Home from "./pages/Home"
import Login from "./pages/Login"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import axios from "axios"
import { Toaster } from 'react-hot-toast';
import SignUp from "./pages/SignUp"
import SearchRoute from "./pages/SearchRoute"
import ResultsRoute from "./pages/ResultsRoute"
import { LoadScript } from '@react-google-maps/api';
import AskAi from "./pages/AskAi"
import { UserContextProvider } from "./context/UserContext"

const MAPS_API_KEY = import.meta.env.VITE_MAPS_API_KEY;
const LIBRARIES = ['geometry'];

axios.defaults.baseURL = import.meta.env.VITE_AXIOS_BASE_URL
axios.defaults.withCredentials = true //habilita o envio de cookies entre domínios

function App() {
  return (
    <div>
      <UserContextProvider>
        <BrowserRouter>
          <Nav />
          <LoadScript googleMapsApiKey={MAPS_API_KEY} libraries={LIBRARIES}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/rota-segura/search" element={<SearchRoute />} />
              <Route path="/rota-segura/result" element={<ResultsRoute />} />
              <Route path="/rota-segura/login" element={<Login />} />
              <Route path="/rota-segura/sign-up" element={<SignUp />} />
              <Route path="/rota-segura/ask-ai" element={<AskAi />} />
            </Routes>
          </LoadScript>
        </BrowserRouter>
        <Toaster
          position="top-right"
          reverseOrder={false}
          toastOptions={{
            style: {
              marginBottom: '20px',
            }
          }}
        />
      </UserContextProvider>
    </div>
  )
}

export default App
