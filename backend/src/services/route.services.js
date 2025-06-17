import { Client } from "@googlemaps/google-maps-services-js";
import { GoogleGenerativeAI } from "@google/generative-ai";

const { MAPS_API_KEY, GEMINI_API_KEY } = process.env;
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

const RouteService = {
    async postRoute({ origin, destination }) {
        const client = new Client({});

        const directions = await client.directions({
            params: {
                origin: origin,
                destination: destination,
                mode: 'DRIVING',
                alternatives: true,
                region: 'br',
                language: 'pt-BR',
                key: MAPS_API_KEY
            },
        });

        const routeOptions = directions.data.routes.map(route => {
            const leg = route.legs[0];
            return {
                //infos para lista de rotas que resumidas no frontend
                summary: route.summary || leg.start_address,
                distance: leg.distance,
                duration: leg.duration,

                //infos para quando o usuário escolher a rota
                full_route_data: {
                    start_address: leg.start_address,
                    end_address: leg.end_address,
                    start_location: leg.start_location,
                    end_location: leg.end_location,
                    overview_polyline: route.overview_polyline,
                    legs: route.legs
                }
            }
        })

        return routeOptions; //envia o array de opções de rotas p frontend
    },

    async postRouteForMode({ origin, destination, mode }) {
        const localClient = new Client({});

        const response = await localClient.directions({
            params: {
                origin,
                destination,
                mode: mode.toUpperCase(),
                language: 'pt-BR',
                key: process.env.MAPS_API_KEY,
            },
        });

        const route = response.data.routes[0];

        if (!route) {
            throw new Error("Nenhuma rota encontrada para este modo.");
        }

        const routeDetails = {
            summary: route.summary || route.legs[0].start_address,
            distance: route.legs[0].distance,
            duration: route.legs[0].duration,
            full_route_data: {
                legs: route.legs,
                overview_polyline: route.overview_polyline,
            },
        };

        return routeDetails;

    },

    async askAi({ question, routeContext}) {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" })
        const prompt = `Aja como um guia turístico local, amigável, especialista e conhecedor de pontos turísticos na cidade de fortaleza. Um usuário está planejando a rota de "${routeContext.origin}" para "${routeContext.destination}". Ele tem a seguinte dúvida sobre essa região ou trajeto: "${question}". Responda de forma útil, concisa e descontraída.`;

        const result = await model.generateContent(prompt)
        const response = result.response
        const text = response.text()

        return { resposta: text }
    }
}


export default RouteService;