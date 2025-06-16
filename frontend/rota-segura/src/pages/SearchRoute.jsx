import { useNavigate } from "react-router-dom";
import FormRota from "@/components/FormRota";
import { useState } from "react";
import axios from "axios";
import React from "react";
import { GoogleMap, Marker, Polyline } from '@react-google-maps/api';
import mapImg from '../assets/map-img.jpg'
import { FiMapPin } from "react-icons/fi";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";

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
          <div className="flex flex-col justify-center gap-1 pt-6 bg-neutral-200 shadow-md shadow-neutral-500 rounded-xl px-10 pb-1 h-auto text-neutral-500 ">
            <div className="flex flex-col mb-2">
              <div className="flex text-2xl text-text-central w-96 font-semibold items-center gap-2">
                <FiMapPin className="w-[23px] h-[23px] text-black" />
                <p>Rotas</p>
              </div>
              <p>Exibiremos as rotas de acordo com as suas preferências.</p>
            </div>
            {routeOptions && routeOptions.length > 0 ? (
              routeOptions.map((route, index) => (
                <div
                  key={index}
                  className="flex flex-col shadow-md shadow-neutral-400 p-2 mb-3 h-max-[150px] cursor-pointer bg-white rounded-2xl"
                  onClick={() => handleSelectRoute(route)}
                >
                  <div className="mb-1">
                    <GoogleMap
                      mapContainerStyle={{ height: "90px", width: "100%" }}
                      center={route.full_route_data.start_location}
                      zoom={12}
                      options={{
                        disableDefaultUI: true,
                      }}
                    >
                      <Marker position={route.full_route_data?.start_location} />
                      <Marker position={route.full_route_data?.end_location} />

                      <Polyline
                        path={google.maps.geometry.encoding.decodePath(route.full_route_data.overview_polyline.points)}
                        options={{
                          strokeColor: "#B58F3D",
                          strokeWeight: 4
                        }}
                      />
                    </GoogleMap>
                  </div>
                  <div className="flex justify-between items-start mt-1">
                    <h3 className="text-neutral-800 w-5/6"><strong>Via {route.summary}</strong></h3>
                    <p>{route.distance.text}</p>
                  </div>
                  <div className="flex items-center border-t-2 py-2 mt-2 hover:bg-neutral-50">
                    <p className="font-semibold w-28">{route.duration.text}</p>
                    <IoIosArrowForward className="ml-90" />
                  </div>
                </div>
              ))
            ) : (
              <img className="max-h-[350px] mb-4" src={mapImg} alt="" />
            )}
          </div>
        </div>
      </div>
    </section>
  )
};

export default SearchRoute;
