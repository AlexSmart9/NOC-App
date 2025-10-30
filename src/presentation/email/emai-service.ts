import nodemailer from 'nodemailer'
import 'dotenv/config';



interface SendEmailOptions {
    to : string | string[],
    subject : string,
    htmlBody : string,
    attachments?: Attachment[]
}

interface Attachment{
    filename : string,
    path: string
}

export class EmailService {

    private transporter = nodemailer.createTransport({
        service : process.env.MAILER_SERVICE,
        auth : {
            user: process.env.MAILER_EMAIL,
            pass: process.env.MAILER_SECRET_KEY
        }
    });

    async sendEmail( options: SendEmailOptions) : Promise<boolean>{

        const {to, subject, htmlBody, attachments = []} = options;

        try {
            
            const sentInformation = await this.transporter.sendMail({
                to: to,
                subject: subject,
                html: htmlBody,
                attachments: attachments

            });

            return true;

        } catch (error) {

            return false;
        }
    }

    async  sendEmailWithFileSystemLogs( to : string | string[]) {
        
        const subject = 'Logs del sistema';
        const htmlBody = `
        <div style="font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; background-color: #f4f4f4; padding: 20px;">
  
            <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #dddddd; border-radius: 8px; overflow: hidden;">
    
                <div style="padding: 24px;">
                    <h1 style="color: #D9534F; margin-top: 0; font-size: 24px;">
                    Logs del sistema - NOC
                    </h1>
      
                    <p style="color: #555555; font-size: 16px; line-height: 1.5;">
                    Logs del sistema de monitoreo.
                    </p>

                </div>
    
                <div style="background-color: #f9f9f9; padding: 16px 24px; text-align: center; border-top: 1px solid #dddddd;">
                    <p style="color: #888888; font-size: 12px; margin: 0;">
                    Este es un mensaje automático.
                    </p>
                </div>

            </div>

        </div>

        `
        const attachments: Attachment[]  = [
            { filename: 'logs-all.log', path: './logs/logs-all.log'},
            { filename: 'logs-high.log', path: './logs/logs-high.log'}

        ];
        
        return this.sendEmail({
            to, subject, attachments, htmlBody
        });

    }


};