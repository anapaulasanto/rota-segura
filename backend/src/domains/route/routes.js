import { Router } from 'express';
import { Client } from "@googlemaps/google-maps-services-js";
import { GoogleGenerativeAI } from '@google/generative-ai'
import 'dotenv/config';

const router = Router();
const client = new Client({});

const { MAPS_API_KEY } = process.env;
const { GEMINI_API_KEY } = process.env

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY)

router.post('/', async (req, res) => {
    try {
        const { origin, destination } = req.body;

        if (!origin || !destination) {
            return res.status(400).json({ error: "Origem e destino são obrigatórios." });
        }

        const directions = await client.directions({
            params: {
                origin: origin,
                destination: destination,
                mode: 'DRIVING',
                alternatives: true,
                region: 'br',
                language:'pt-BR',
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

        res.json(routeOptions) //envia o array de opções de rotas para o frontend

    } catch (error) {
        console.error('Erro ao processar o mapa:', error.response?.data?.error_message || error.message);
        res.status(500).json({ error: 'Erro ao processar o mapa' });
    }
});

router.post('/mode', async (req, res) => {
    const localClient = new Client({});
    try {
        const { origin, destination, mode } = req.body;
        console.log(mode);

        if (!origin || !destination || !mode) {
            return res.status(400).json({ error: "Origem, destino e modo são obrigatórios." });
        }

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
            return res.status(404).json({ error: "Nenhuma rota encontrada para este modo." });
        }
        
        const routeDetails = {
            summary: route.summary || route.legs[0].start_address,
            distance: route.legs[0].distance,
            duration: route.legs[0].duration,
            full_route_data: {
                legs: route.legs,
                overview_polyline: route.overview_polyline,
            }
        };

        res.json(routeDetails);

    } catch (error) {
        console.error('Erro ao buscar rota única:', error.response?.data?.error_message || error.message);
        res.status(500).json({ error: 'Erro ao buscar rota única.' });
    }
});

router.post('/ai', async (req, res) => {
    const { question, routeContext } = req.body;

    if (!question) {
        return res.status(400).json({ error: "A pergunta é obrigatória" })
    }
    
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" })
        const prompt = `Aja como um guia turístico local, amigável, especialista e conhecedor de pontos turísticos na cidade de fortaleza. Um usuário está planejando a rota de "${routeContext.origin}" para "${routeContext.destination}". Ele tem a seguinte dúvida sobre essa região ou trajeto: "${question}". Responda de forma útil, concisa e descontraída.`;
    
        const result = await model.generateContent(prompt)
        const response = await result.response
        const text = response.text()
    
        res.json({ resposta: text })
        
    } catch (error) {
        console.error("Erro na API da IA:", error);
        res.status(500).json({ error: "Não foi possível obter uma resposta da IA." });
    }
})


export default router; 