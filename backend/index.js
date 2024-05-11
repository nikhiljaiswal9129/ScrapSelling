import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';


const app = express();
const PORT = 8800;

const corsOption = {
    origin: 'http://localhost:4200/',
    optionsSuccessStatus: 200
}

//Middleware
app.use(cors());
// app.use(cors(corsOption));
app.use(bodyParser.json());
app.use(express.json());
app.use('/', userRoutes);
// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");    
//     next();
//   });

app.listen(PORT, (err)=>{
    if(err){
        console.log('error');
    }
    else{
        console.log('started on port:', PORT);
    }
});