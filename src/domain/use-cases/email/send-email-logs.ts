import { EmailService } from "../../../presentation/email/emai-service.js"
import { LogEntity, LogSeverityLevel } from "../../entities/log.entity.js"
import { LogRepository } from "../../repository/log.repository.js"


interface SendLogEmailUseCase {
    execute: (to: string | string[]) => Promise<boolean>
}

export class SendEmailLogs implements SendLogEmailUseCase {

    constructor(
        private readonly emailService: EmailService,
        private readonly logRepositry: LogRepository
    ){}

    async execute( to: string | string[]) {

        try {
            
            const sent = await this.emailService.sendEmailWithFileSystemLogs(to)
            if( !sent ) {
                throw new Error('Email log not sent')
            };

            const log = new LogEntity({
                message:`Log Email Sent`,
                level: LogSeverityLevel.low,
                origin: 'send-email-log.ts'
            });

            this.logRepositry.saveLog(log);

            return true;

        } catch (error) {
            
            const log = new LogEntity({
                message:`${error}`,
                level: LogSeverityLevel.high,
                origin: 'send-email-log.ts'
            });

            this.logRepositry.saveLog(log);

            return false;
        }
    
    }
}