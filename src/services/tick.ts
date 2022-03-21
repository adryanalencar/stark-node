import axios from "axios";
import { logger } from "./logger";

/**
 * 
 * This code, will request the project URL when the application is closed.
 * Thats will grant the application to be restarted, to not lost the CRON jobs. * 
 */

export function preventStop(){
    process
    .on('SIGTERM', shutdown('SIGTERM'))
    .on('SIGINT', shutdown('SIGINT'))
    .on('uncaughtException', shutdown('uncaughtException'));
}

function shutdown(signal : string) {
    return (err : any) => {
        logger.warn(`${signal}...`);
        if (err) logger.error(err.stack || err);
        setTimeout(() => {
            logger.warn('...waited 5s, exiting.');

            // prevent application shutdown
            axios.get(process.env.BASE_URL || "");

            process.exit(err ? 1 : 0);
        }, 5000).unref();
    };
}
