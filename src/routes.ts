import { Router } from 'express';
import { WebhookController } from './controllers/WebhookController';
const router = Router();

const webhookController = new WebhookController();

router.post('/dispatch-invoice', webhookController.dispatch);
router.get('/', webhookController.hello);

export { router }