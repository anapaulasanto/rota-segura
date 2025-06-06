import React from "react";
import { useLocation, Link } from "react-router-dom";
import { GoogleMap, Marker, Polyline } from '@react-google-maps/api';
import { TbRoute } from "react-icons/tb";
import { FiMapPin } from "react-icons/fi";
import { TbClockHour3 } from "react-icons/tb";
import { LuNavigation } from "react-icons/lu";

const mapContainerStyle = {
    width: '100%',
    height: '90vh',
    borderRadius: '15px',
};

const ResultsRoute = () => {
    const location = useLocation();
    const result = location.state?.route

    if (!result) {
        return (
            <div className="flex flex-col gap-2 text-center pt-[40vh]">
                <h1 className="text-2xl font-bold">Nenhuma rota selecionada</h1>
                <p>Por favor, volte para a página de busca e selecione uma rota.</p>
                <Link to="/rota-segura/search">
                    <button className='bg-central cursor-pointer mb-10 rounded-full mt-4 px-11 py-3 shadow-md hover:bg-yellow-600 hover:text-white shadow-neutral-600 max-xl:mt-10 max-xl:text-2xl max-sm:px-7 max-sm:py-5'>Buscar rotas</button>
                </Link>
            </div>
        );
    }

    const leg = result.full_route_data.legs[0];

    return (
        <section className="bg-gray-100 p-5">
            <div className="flex h-[90vh]">
                <GoogleMap mapContainerStyle={mapContainerStyle} center={leg.start_location} zoom={14}>
                    <Marker position={leg.start_location} />
                    <Marker position={leg.end_location} />
                    <Polyline
                        path={google.maps.geometry.encoding.decodePath(result.full_route_data.overview_polyline.points)}
                        options={{ strokeColor: "#007BFF", strokeWeight: 5 }}
                    />
                </GoogleMap>
                <div className="flex flex-col gap-5 p-4 ">
                    <div className="flex flex-col gap-4 bg-white p-4 py-6 w-5/6 rounded-2xl shadow-xl">
                        <div className="flex items-center gap-2  text-neutral-700 ">
                            <TbRoute className="w-[23px] h-[23px]" />
                            <h1 className="text-xl w-4/5 font-bold">Via {result.summary} </h1>
                        </div>
                        <div className="flex justify-start gap-5">
                            <p className="flex items-center gap-1 bg-neutral-200 rounded-md px-2 py-1 text-sm font-semibold"><FiMapPin />{leg.distance.text}</p>
                            <p className="flex items-center gap-1 bg-neutral-200 rounded-md px-2 py-1 text-sm font-semibold"><TbClockHour3 />{leg.duration.text}</p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-4 bg-white p-4 py-6 w-5/6 rounded-2xl shadow-xl overflow-y-auto">
                        <div className="flex items-center gap-1 mb-3 pb-3 border-b">
                            <LuNavigation className="text-xl"/>
                            <h2 className="text-2xl font-bold text-neutral-700">Instruções de navegação</h2>
                        </div>
                        <ol className="list-decimal list-inside space-y-3">
                            {leg.steps.map((step, index) => (
                                <div className="border p-3 rounded-lg">
                                    <li key={index}
                                        dangerouslySetInnerHTML={{ __html: step.html_instructions }}
                                    />
                                </div>
                            ))}
                        </ol>
                    </div>
                </div>
            </div>
        </section>
    )
};

export default ResultsRoute;
