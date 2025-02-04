import dotenv from "dotenv";

dotenv.config();

const Config = {
  serverPort: process.env.PORT,
  mongo: {
    url: process.env.MONGODB_URI,
  }
};


export default Config;
