import mongoose from 'mongoose';



interface ConnectionOptions {
  mongoUrl: string;
  dbName: string;
}

export class MongoDatabase {

  static async connect(options: ConnectionOptions) {

    // Implementation for connecting to MongoDB

    const { mongoUrl, dbName } = options;

    try {

      await mongoose.connect(mongoUrl, {
        dbName
      });

      console.log("MongoDB connected successfully");

    } catch (error) {

      console.error("MongoDB connection failed:", error);
      throw error;
    }
  }
}