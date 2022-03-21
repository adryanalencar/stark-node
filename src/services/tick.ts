import { logger } from "./logger";

process
    .on('SIGTERM', shutdown('SIGTERM'))
    .on('SIGINT', shutdown('SIGINT'))
    .on('uncaughtException', shutdown('uncaughtException'));


export function startTick(){
    setInterval(() => {
        console.info(`[info][${new Date().toISOString()}] => Tick`);
    }, 1000);
}


function shutdown(signal : string) {
    return (err : any) => {
        logger.warn(`${signal}...`);
        if (err) logger.error(err.stack || err);
        setTimeout(() => {
            logger.warn('...waited 5s, exiting.');
            process.exit(err ? 1 : 0);
        }, 5000).unref();
    };
}
