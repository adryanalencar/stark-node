import * as cron from 'node-cron';
import { Invoice } from 'starkbank';
import { logger } from './logger';
import { StarkManager } from './starkbank';

const starkManager = new StarkManager();

const Task = async () => {
    const invoices_amount = Math.floor(Math.random() * (12 - 8 + 1)) + 8;    
    const invoices = [] as Invoice[];

    for (let i = 0; i < invoices_amount; i++) {
        let amount = (Math.floor(Math.random() * (1000 - 100 + 1)) + 100) * 100;       

        invoices.push(new Invoice({
            amount,
            taxId : "20.018.183/0001-80",
            name : "Stark Bank S.A.",
            discounts : []
        }));
    }
      
    var createdInvoices = await starkManager.createInvoice(invoices);
    
    if(createdInvoices.status === "success"){
        logger.info(`${invoices_amount} invoices created;`);
    }else{
        logger.error(`${invoices_amount} invoices not created;`);
    }   

    return createdInvoices;
}


export const initWorker = () => {
    logger.info("Worker started;");
    //Task();

    cron.schedule('0 */3 * * *', async () => {
        logger.info(`Creating new invoices;`);
        Task();
    });
}