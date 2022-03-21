require('dotenv').config()
import { app } from './app';
import { logger } from './services/logger';
import { preventStop } from './services/tick';
import { initWorker } from './services/worker';

app.listen(process.env.PORT || 8080, () => {  
    logger.info(`[HTTP] => Server is running on port ${process.env.PORT || 8080}`);
    initWorker();
    preventStop();
});