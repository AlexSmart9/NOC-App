import { LogDatasource } from "../../datasource/log.datasource.js";
import { LogEntity, LogSeverityLevel } from "../../entities/log.entity.js";


interface CheckServiceUseCase {
    execute(url: string):Promise<boolean>
};

type SuccesCallback = (() => void ) | undefined;
type ErrorCallback = (( error: string) => void) | undefined;

export class CheckService implements CheckServiceUseCase{

    constructor(
        private readonly logDatasource  : LogDatasource,
        private readonly succesCallback : SuccesCallback,
        private readonly errorCallback  : ErrorCallback,
    ) {};



    async execute( url: string) : Promise<boolean> {

        try {

            const req = await fetch(url);

            if (!req.ok) {
                throw new Error(`Error check service ${url}`);
            };

            const log = new LogEntity(`Service ${url} is working`, LogSeverityLevel.low);

            this.logDatasource.saveLog( log );
            this.succesCallback && this.succesCallback();

            return true;

        } catch ( error ) {
            
            const erroMessage = `${url} is not working: ${ error }`
            const log = new LogEntity( erroMessage, LogSeverityLevel.high );

            this.logDatasource.saveLog( log );
            this.errorCallback && this.errorCallback( erroMessage );

            return false;   
        }
    }
}