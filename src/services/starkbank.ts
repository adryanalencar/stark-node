import starkbank, { Invoice, Transfer } from 'starkbank';
import { logger } from './logger';

export class StarkManager {   

    constructor() {
        this.doAuth();
    }

    doAuth() {
        try{
            starkbank.user = new starkbank.Project({
                environment: process.env.ENVIROMENT,
                id: process.env.STARK_ID,
                privateKey: process.env.PRIVATE_KEY
            });
            logger.info("[STARKBANK] => Auth success");
        }catch(e : any){

            logger.error(`[STARKBANK] => Error on API doAuth: ${e.message}`);
            logger.error(JSON.stringify(process.env));

            throw(e); 
        }

    }

    async validateSignature(data: string, key : string){        
        let event = await starkbank.event.parse({
            content: data,
            signature: key,
            user: starkbank.user
        });

        return event;
    }
    
    async createTransfer(order: Transfer[]) {
        try {
            let transfers = await starkbank.transfer.create(order, starkbank.user);

            return {                
                status: "success",
                message: "Transfer created",
                transfers: transfers
            };
        }catch(e : any){
            return {
                status: "error",
                message: e.message,
                trasnfers: order
            };
        }
    }

    async createInvoice(order: Invoice[]) {        
        try {
            const response = await starkbank.invoice.create(order, starkbank.user);
            return {
                status: "success",
                message: "Invoice created",
                invoices: response
            };
        } catch (e : any) {                                       
            return {
                status: "error",
                message: "Input error",                   
                errors: e.errors,
                invoices: order
            };
        }
    }
}
