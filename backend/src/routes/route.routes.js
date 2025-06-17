import { Router } from 'express';
import RouteController from '../controllers/route.controller.js';

const routeRouter = Router();

routeRouter.post('/', RouteController.postRoutes);
routeRouter.post('/mode', RouteController.postMode);
routeRouter.post('/ai', RouteController.postAskAi);

export default routeRouter;
