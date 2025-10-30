import { CheckService } from "../domain/use-cases/checks/check-service.js";
import { SendEmailLogs } from "../domain/use-cases/email/send-email-logs.js";
import { FileSytemDatasource } from "../infraestructure/datasorces/file-system.datasource.js";
import { LogRepositoryImpl } from "../infraestructure/repositories/log.repositoy.impl.js";
import { CronService } from "./cron/cron-service.js";
import { EmailService } from "./email/emai-service.js";

const fileSystemLogRepository = new LogRepositoryImpl(
    new FileSytemDatasource()
)

const emailSerrvice = new EmailService();

export class Server {

    public static start() {
        console.log('Server started...');

        //Mandar email
        new SendEmailLogs(
            emailSerrvice,
            fileSystemLogRepository
        ).execute([
            'barcode3224@gmail.com', 'alex14martinez36@gmail.com'
        ])
        
    

        // CronService.createJob(
        //     '*/5 * * * * *',
        //     () => {
                
        //        const url : string = 'https://google.com'
        //         new CheckService(
        //             fileSystemLogRepository,
        //             () => console.log(`${url} is ok`),
        //             ( error ) => console.log( error ) 
        //         ).execute( url )

        //     },
        // );
    };
};