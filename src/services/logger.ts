import winston from 'winston';

const console = winston.format.printf(({ timestamp, level, message, meta }) => {
    return `[${level}][${timestamp}] => ${message}`;
});

export const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(        
        winston.format.timestamp(),
        console
    ),
    transports: [
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'combined.log' }),
        new winston.transports.Console()
    ],
});