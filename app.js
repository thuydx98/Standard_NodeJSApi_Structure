import express from 'express';
import bodyParser from 'body-parser';
import {connect} from './configs/db';
import {router} from './routes/index';

const PORT = 8001;
const APP = express();

connect();
APP.use(bodyParser.json());
APP.use(bodyParser.urlencoded({ extended: false }));

APP.use('/', router);

APP.listen(PORT, (req, res) => {
    console.log("Server is running on port: " + PORT);
})