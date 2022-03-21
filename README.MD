# StarkBank Challenge
 This project have as objective to cumpre the StarkBank Challenge tasks.

### Tasks:
   1. Issues 8 to 12 Invoices every 3 hours to random people for 24 hours (our Sandbox
   emulation environment will make sure some of those are automatically paid);

   2. Receives the webhook callback of the Invoice credit and sends the received amount
   (minus eventual fees) to the following account using a Transfer:
       a. bank code: 20018183,
       b. branch: 0001,
       c. account: 6341320293482496
       d. name: Stark Bank S.A.
       e. tax ID: 20.018.183/0001-80
       f. account type: payment

### Getting Started

   Install required dependecies:
   
   > npm i



   Set the enviroment variables:
   ```
       STARK_ID                 // Project ID
       PRIVATE_KEY              // Your .pem private file content
       ENVIROMENT               // Your running mode "sandbox" or production
       PORT                     // HTTP server port
   ```
   
   
   Start the project:
   
   > npm run dev   
   