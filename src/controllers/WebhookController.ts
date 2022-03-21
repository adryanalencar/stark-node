import { Request, Response } from "express";
import { Transfer } from "starkbank";
import { logger } from "../services/logger";
import { StarkManager } from "../services/starkbank";
const starkManager = new StarkManager();

class WebhookController{

    async hello(request: Request, response: Response){
        return response.json({
            status: "ok",
            message: "Hello world",
            github: "https://github.com/AdryanAlencar/stark-node/",
            version: "1.0.0",
            author: "Adryan Alencar"
        });
    }

    async dispatch(request: Request, response: Response){        
        const key = request.header("Digital-Signature") || "";
        try{
            const event = await starkManager.validateSignature(request.body, key);

            if (event.subscription === "invoice" && event.log.type === "credited") {
                let amount = event.log.invoice.amount;                               
                let total = amount - 50; // 50 pix fee.

                let transfer = await starkManager.createTransfer([
                    new Transfer({
                        amount: total,
                        name: "Stark Bank S.A.",
                        taxId: "20.018.183/0001-80",                        
                        bankCode: "20018183", // if tree digits => TED, if more => Pix.
                        branchCode: "0001",
                        accountNumber: "6341320293482496",                        
                        accountType: "payment"
                    })
                ]);

                logger.info(`[WEBHOOK] => Transfer created: ${event.log.invoice.id}`);
            }

        }catch(e : any){
            logger.error(`[WEBHOOK] => Error on API dispatch: ${e.message}`);

            return response.status(400).send({
                status: "error",
                message: "Invalid signature"
            });            
        }
        
        response.sendStatus(200);
    }


}

export { WebhookController }