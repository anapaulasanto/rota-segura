import React, { useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import axios from "axios";
import ResultRoute from "@/components/resultRoute/ResultRoute";

const ResultsRoute = () => {
    const navigate = useNavigate()
    const location = useLocation();
    const [currentRoute, setCurrentRoute] = useState(location.state?.route);
    const [isLoading, setIsLoading] = useState(false);

    const handleModeChange = async (newMode) => {
        if (!currentRoute) return;

        setIsLoading(true);
        try {
            const leg = currentRoute.full_route_data.legs[0];
            const originCoords = `${leg.start_location.lat},${leg.start_location.lng}`;
            const destinationCoords = `${leg.end_location.lat},${leg.end_location.lng}`;

            const response = await axios.post('/routes/mode', {
                origin: originCoords,
                destination: destinationCoords,
                mode: newMode,
            });
            console.log(response);
            setCurrentRoute(response.data);

        } catch (error) {
            console.error("Erro ao mudar o modo de transporte:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleAskAi = () => {
        navigate("/rota-segura/ask-ai", { state: { route: currentRoute } })
    }

    const leg = currentRoute.full_route_data.legs[0];

    return (

        
        <section className="bg-gray-50 p-5">
            <button onClick={() => navigate(-1)} className="flex items-center mb-2 text-neutral-400 cursor-pointer">
                <IoIosArrowBack className="text-xl" />
                <p className="text-sm">Voltar</p>
            </button>
            <ResultRoute currentRoute={currentRoute} handleAskAi={handleAskAi} handleModeChange={handleModeChange} isLoading={isLoading} leg={leg} />
        </section>
    )
};

export default ResultsRoute;
