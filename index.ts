import express from "express";
import bodyParser from "body-parser";
import cors from 'cors';
import helmet from 'helmet';

import {router} from './routes/route';
const app = express();

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

const corsOptions = {
    origin: '*',
    methods: [
        'GET',
        'POST',
    ],
    allowedHeaders: [
        'Content-Type',
    ]
}

app.use(cors(corsOptions));
app.use('/api' , router);


app.listen(3000,()=>{
    console.log('The application is listening on port 3000');
})

module.exports ={app};
