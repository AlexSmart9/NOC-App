import { LogModel } from "../../data/mongo";
import { LogDatasource } from "../../domain/datasource/log.datasource";
import { LogEntity } from "../../domain/entities/log.entity";



export class MondoLogDatasource implements LogDatasource {

  async saveLog(log: LogEntity): Promise<void> {
    const newLog = await LogModel.create(log);
    console.log('Mongo log created:', newLog.id);
  }

  async getLogs(severityLevel: any): Promise<LogEntity[]> {

    const logs = await LogModel.find({
      level: severityLevel
    });

    return logs.map(mongoLog => LogEntity.fromObject(mongoLog));
  };
};