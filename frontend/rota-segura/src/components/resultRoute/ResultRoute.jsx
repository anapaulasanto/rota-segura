import React from "react";
import { GoogleMap, Marker, Polyline } from '@react-google-maps/api';
import { FaMagic } from "react-icons/fa";
import CardModeRoutes from "@/components/resultRoute/CardModeRoutes";
import CardStepsNavigation from "@/components/resultRoute/CardStepsNavigation";

const mapContainerStyle = {
    width: '80%',
    height: '90vh',
    borderRadius: '15px',
};

const ResultRoute = ({ leg, currentRoute, handleModeChange, isLoading, handleAskAi }) => {
    return (
        <div className="flex h-[90vh]">
            <GoogleMap mapContainerStyle={mapContainerStyle} center={leg.start_location} zoom={14}>
                <Marker position={leg.start_location} />
                <Marker position={leg.end_location} />
                <Polyline
                    path={google.maps.geometry.encoding.decodePath(currentRoute.full_route_data.overview_polyline.points)}
                    options={{ strokeColor: "#007BFF", strokeWeight: 5 }}
                />
            </GoogleMap>
            <div className="flex flex-col gap-5 p-4 ">
                <CardModeRoutes handleModeChange={handleModeChange} isLoading={isLoading} currentRoute={currentRoute} leg={leg} />
                <CardStepsNavigation leg={leg} />
                <button
                    className="flex mx-auto justify-center gap-2 bg-central py-4 w-1/3 rounded-2xl shadow-xl cursor-pointer hover:bg-central/90"
                    onClick={() => handleAskAi()}
                >
                    <FaMagic />
                    <p className="text-sm font-bold text-black">Pergunte a IA</p>
                </button>
            </div>
        </div>
    )
};

export default ResultRoute;
