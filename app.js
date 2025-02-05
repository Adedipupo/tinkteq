import express from 'express';
import helmet from 'helmet';
import dotenv from 'dotenv';
import logger from 'morgan'
import morgan from 'morgan'
import cors from 'cors'
import fs from 'fs'
import path from 'path'
import connectDB from './src/config/database.js';
import Config from './src/config/config.js';
import indexRouter from './src/routes/index.js';
import { initializeSocket } from './src/socket/socket.js';
import { io } from './src/socket/socket.js';

dotenv.config()

const app = express();

connectDB()

const port = Config.serverPort || 3000;

const __dirname = path.dirname(new URL(import.meta.url).pathname)


app.use(express.json());
app.use(helmet())
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(
  cors({
    origin: '*',
    optionsSuccessStatus: 200,
    allowedHeaders: ['X-Requested-With', 'Content-Type', 'Authorization'],
    methods: ['GET', 'POST', 'PUT','PATCH', 'DELETE', 'OPTIONS'],
  }),
)

app.use(express.static(path.join(__dirname, 'public')))


const accessLogStream = fs.createWriteStream(
  path.join(__dirname, 'access.log'),
  { flags: 'a' },
)

app.use(morgan('combined', { stream: accessLogStream }))

app.get('/', (_req, res) => {
  res.redirect('/api/v1')
})

app.use('/api/v1/', indexRouter)

app.all('/health', (req, res) => {
  res
    .status(200)
    .json({
      message: 'Welcome to TinkTeq API',
      info: {
        url: `${req.protocol}://${req.hostname}${req.path}`,
      },
    })
    .end()
})

const server =  app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
    initializeSocket(server); 
});

export default app;