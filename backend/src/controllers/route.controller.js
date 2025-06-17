import RouteService from "../services/route.services.js";

const RouteController = {
    async postRoutes(req, res) {
        const { origin, destination } = req.body;

        if (!origin || !destination) {
            return res.status(400).json({ error: "Origem e destino são obrigatórios." });
        }

        try {
            const routeOptions = await RouteService.postRoute({ origin, destination });
            res.status(200).json(routeOptions);

        } catch (error) {
            console.error('Erro no controller de rotas:', error.response?.data?.error_message || error.message);
            res.status(500).json({ error: 'Erro ao buscar rotas' });
        }
    },

    async postMode(req, res) {
        const { origin, destination, mode } = req.body;
        console.log(mode);

        if (!origin || !destination || !mode) {
            return res.status(400).json({ error: "Origem, destino e modo são obrigatórios." });
        }

        try {
            const routeDetails = await RouteService.postRouteForMode({ origin, destination, mode });

            res.status(200).json(routeDetails);

        } catch (error) {
            console.error('Erro no controller de modo de rota:', error.response?.data?.error_message || error.message);
            res.status(500).json({ error: 'Erro no controller de modo de rota' });
        }
    },

    async postAskAi(req, res) {
        const { question, routeContext } = req.body;

        if (!question) {
            return res.status(400).json({ error: "A pergunta é obrigatória" });
        }

        try {
            const response = await RouteService.askAi({ question, routeContext });
            res.status(200).json(response);

        } catch (error) {
            console.error("Erro no controller da API da IA:", error);
            res.status(500).json({ error: "Não foi possível obter uma resposta da IA." });
        }
    }
}

export default RouteController;