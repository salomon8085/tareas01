import express from 'express';
import cors from 'cors'
import {PORT} from './config.js';
import indexRouter from './routes/index.routes.js';
import taskRouter from './routes/task.routes.js';

const app =express();

 app.use(cors(/*{     
     origin: 'http://localhost:5173'
 }*/));
 
app.use(express.json());

app.use(indexRouter);
app.use(taskRouter);

app.listen(PORT);

console.log(`Server is running on port ${PORT}`);
