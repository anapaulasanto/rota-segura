import { Router } from 'express';
import { Client } from "@googlemaps/google-maps-services-js";
import 'dotenv/config';

const router = Router();
const client = new Client({}); 
const { MAPS_API_KEY } = process.env;

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
                // mode: 'BICYCLING',
                key: MAPS_API_KEY
            },
        });

        const route = directions.data.routes[0];
        const leg = route.legs[0];

        res.json({
            distance: leg.distance,
            duration: leg.duration,
            start_address: leg.start_address,
            end_address: leg.end_address,
            overview_polyline: route.overview_polyline,
        });

    } catch (error) {
        console.error('Erro ao processar o mapa:', error.response?.data?.error_message || error.message);
        res.status(500).json({ error: 'Erro ao processar o mapa' });
    }
});

export default router; 