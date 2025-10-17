import { CheckService } from "../domain/use-cases/checks/check-service.js";
import { FileSytemDatasource } from "../infraestructure/datasorces/file-system.datasource.js";
import { LogRepositoryImpl } from "../infraestructure/repositories/log.repositoy.impl.js";
import { CronService } from "./cron/cron-service.js";

const fileSystemLogRepository = new LogRepositoryImpl(
    new FileSytemDatasource()
)

export class Server {

    public static start() {
        console.log('Server started...');

        CronService.createJob(
            '*/5 * * * * *',
            () => {
                
               const url : string = 'https://google.com'
                new CheckService(
                    fileSystemLogRepository,
                    () => console.log(`${url} is ok`),
                    ( error ) => console.log( error ) 
                ).execute( url )

            },
        );
    };
};