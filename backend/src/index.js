import express from 'express';
import cors from 'cors';

import './db/mongoose.js' 

import { router as userRouter } from './routers/user.js'
import { router as taskRouter } from './routers/task.js'

const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());
app.use(cors());
app.use(userRouter);
app.use(taskRouter);

app.listen(port, ()=>{console.log('server running on port '+port);});
