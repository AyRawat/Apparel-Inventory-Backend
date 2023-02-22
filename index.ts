import express from "express";
import bodyParser from "body-parser";
import cors from 'cors';
import helmet from 'helmet';

const routes = require('./routes/routes.ts');
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
app.use('/api' , routes);

app.listen(3000,()=>{
    console.log('The application is listening on port 3000');
})

