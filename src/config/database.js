import mongoose from 'mongoose'
import Config from './config.js'



const connectDB = async () => {
    try {
      await mongoose.connect(Config.mongo.url)
  
      console.log(`Connected to MongoDB Successfully`)
      console.log('  ▀▄   ▄▀')
      console.log(' ▄█▀███▀█▄')
      console.log('█▀███████▀█')
      console.log('█ █▀▀▀▀▀█ █')
      console.log('   ▀▀ ▀▀')
      console.log('Hello Adventurer, Tinkteq api is live !!!!')

    } catch (error) {
      console.error(`Error: ${error.message}`)
      process.exit(1)
    }
  }
  
  export default connectDB
  