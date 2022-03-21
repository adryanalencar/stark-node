import { Router } from 'express';
import { WebhookController } from './controllers/WebhookController';
const router = Router();

const webhookController = new WebhookController();

router.post('/dsipatch', webhookController.dispatch);
router.get('/', webhookController.hello);

export { router }