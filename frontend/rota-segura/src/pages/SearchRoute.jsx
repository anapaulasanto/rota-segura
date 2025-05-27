import { useNavigate } from "react-router-dom";
import FormRota from "@/components/FormRota";
import { useState } from "react";
import axios from "axios";
import React from "react";

const SearchRoute = () => {
  const navigate = useNavigate();
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [error, setError] = useState(null);
  const [route, setRoute] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (origin && destination) {
      try {
        const req = await axios.post("/routes", {
          origin: origin,
          destination: destination
        })
        const result = req.data
        console.log(result);
        navigate("/rota-segura/results", { state: result })

      } catch (error) {
        console.log("erro ao buscar routa", error);
      }
    } else {
      setError("Preencha todos os campos");
    }
  }

  return (
    <section>
      <FormRota
        handleSubmit={handleSubmit}
        error={error}
        setOrigin={setOrigin}
        setDestination={setDestination}
        destination={destination}
        origin={origin}
      />
    </section>
  )
};

export default SearchRoute;
