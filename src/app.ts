import { envs } from "./config/plugins/envs.plugin.js";
import { LogModel } from "./data/mongo/index.js";
import { MongoDatabase } from "./data/mongo/init.js";
import { Server } from "./presentation/server.js";
import "dotenv/config";

(async () => {
  main()
})();


async function main() {

  await MongoDatabase.connect({
    mongoUrl: envs.MONGO_URL,
    dbName: envs.MONGO_DB_NAME
  })

  // Crear una colección = tables, documento = registro.
  // const newLog = await LogModel.create({
  //   message: 'Test message from Mongo',
  //   origin: 'App.ts',
  //   level: 'low',
  // })

  // await newLog.save();

  // console.log(newLog);



  // Leer colección
  // const logs = await LogModel.find();

  // console.log(logs);


  // Server.start()

};