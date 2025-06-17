import { useNavigate } from "react-router-dom";
import FormRota from "@/components/searchRoute/FormRota";
import { useState } from "react";
import axios from "axios";
import React from "react";
import { IoIosArrowBack } from "react-icons/io";
import CardRouteOptions from "@/components/searchRoute/CardRouteOptions";

const SearchRoute = () => {
  const navigate = useNavigate();
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [error, setError] = useState(null);
  const [routeOptions, setRouteOptions] = useState([]) //guarda a lista/array de opções de rotas com infos resumidas vindas do back

  const handleCalculateRoute = async (e) => {
    e.preventDefault();
    setError(null);
    setRouteOptions([]); // Limpa as opções de rota antes de buscar uma nova

    if (origin && destination) {
      try {
        const req = await axios.post("/routes", {
          origin: origin,
          destination: destination
        })

        const result = req.data
        console.log(result);
        setRouteOptions(result);

      } catch (error) {
        console.log("erro ao buscar rota", error);
        setError("Ops! Não conseguimos buscar as rotas. Tente novamente mais tarde.");
      }
    } else {
      setError("Preencha todos os campos");
    }
  }

  const handleSelectRoute = (route) => {
    console.log("route details:", route);

    navigate("/rota-segura/result", { state: { route: route } });
  }

  return (
    <section className="bg-gray-100 w-full min-h-screen shadow-neutral-300">
      <button onClick={() => navigate(-1)} className="flex items-center ml-25 text-neutral-400 cursor-pointer">
        <IoIosArrowBack className="text-xl" />
        <p className="text-sm">Voltar</p>
      </button>
      <div className="flex flex-col items-center justify-center max-w-6xl mx-auto pb-20">
        <div className="flex flex-col items-center py-10 text-center font-semibold">
          <h1 className="text-5xl pb-6">Descubra a <span className="text-text-central">rota segura</span> para você</h1>
          <p className="text-lg w-[580px] text-neutral-600">Planeje rotas seguras e eficientes, evite o trânsito e explore novas aventuras.</p>
        </div>
        <div className="flex justify-center items-center gap-10 pt-10 ">
          <div>
            <FormRota
              handleSubmit={handleCalculateRoute}
              error={error}
              setOrigin={setOrigin}
              setDestination={setDestination}
              destination={destination}
              origin={origin}
            />
          </div>
          <CardRouteOptions handleSelectRoute={handleSelectRoute} routeOptions={routeOptions} />
        </div>
      </div>
    </section>
  )
};

export default SearchRoute;
