import Nav from "./components/Nav"
import Home from "./pages/Home"
import Login from "./pages/Login"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import axios from "axios"
import { useEffect, useState } from "react"
import { Toaster } from 'react-hot-toast';
import SignUp from "./pages/SignUp"
import Profile from "./pages/Profile"
import SearchRoute from "./pages/SearchRoute"
import ResultsRoute from "./pages/ResultsRoute"
import { GoogleMap, LoadScript, Marker, Polyline } from '@react-google-maps/api';

const MAPS_API_KEY = import.meta.env.VITE_MAPS_API_KEY;
const LIBRARIES = ['geometry'];

axios.defaults.baseURL = import.meta.env.VITE_AXIOS_BASE_URL
axios.defaults.withCredentials = true //habilita o envio de cookies entre domínios

function App() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const userIsLogged = async () => {
      try {
        const { data } = await axios.get("/users/profile")
        setUser(data)

      } catch (error) {
        console.log('erro ao autenticar usuario no front: ' + error);
      }
    }
    userIsLogged()
  }, []);

  return (
    <div>
      <BrowserRouter>
        <Nav user={user} />

        <LoadScript googleMapsApiKey={MAPS_API_KEY} libraries={LIBRARIES}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/rota-segura/search" element={<SearchRoute />} />
            <Route path="/rota-segura/result" element={<ResultsRoute />} />
            <Route path="/rota-segura/login" element={<Login user={user} setUser={setUser} />} />
            <Route path="/rota-segura/sign-up" element={<SignUp user={user} setUser={setUser} />} />
            <Route path="/rota-segura/profile/:section?" element={<Profile />} />
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
    </div>
  )
}

export default App
