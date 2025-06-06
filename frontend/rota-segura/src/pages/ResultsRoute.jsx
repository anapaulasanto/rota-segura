import React from "react";
import { useLocation, Link } from "react-router-dom";
import { GoogleMap, Marker, Polyline } from '@react-google-maps/api';

const mapContainerStyle = {
    width: '100%',
    height: '60vh',
};

const ResultsRoute = () => {
    const location = useLocation();
    const result = location.state?.routeDetails

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

    const leg = result.legs[0];

    return (
            <section>
                <div className="flex">
                    <GoogleMap mapContainerStyle={mapContainerStyle} center={leg.start_location} zoom={14}>
                        <Marker position={leg.start_location} />
                        <Marker position={leg.end_location} />
                        <Polyline
                            path={google.maps.geometry.encoding.decodePath(result.overview_polyline.points)}
                            options={{ strokeColor: "#007BFF", strokeWeight: 5 }}
                        />
                    </GoogleMap>
                    <div className="bg-gray-50 p-4 rounded-lg h-[60vh] overflow-y-auto">
                        <h2 className="text-2xl font-semibold mb-3">Instruções</h2>
                        <div className="text-lg">
                            <p><strong>Distância Total:</strong> {leg.distance.text}</p>
                            <p className="mb-4"><strong>Duração Estimada:</strong> {leg.duration.text}</p>
                        </div>
                        <ol className="list-decimal list-inside space-y-3">
                            {leg.steps.map((step, index) => (
                                <li key={index}
                                    // A instrução vem com HTML (<b>, <div>), usamos dangerouslySetInnerHTML para renderizá-lo
                                    dangerouslySetInnerHTML={{ __html: step.html_instructions }}
                                />
                            ))}
                        </ol>
                    </div>
                </div>
                {/* <p>{result.summary}</p>
                <p>{result.duration.text}</p>
                <p>{result.distance.text}</p>
                <p>{result.full_route_data.start_adress}</p>
                <p>{result.full_route_data.end_adress}</p>
                <p>{result.full_route_data.legs}</p> */}
            </section>
    )
};

export default ResultsRoute;
