import express from 'express';
import bodyParser from 'body-parser';
import { router } from './routes/index';
import { migration } from './configs/migration';

const PORT = 8001;
const APP = express();

migration();

APP.use(bodyParser.json());
APP.use(bodyParser.urlencoded({ extended: false }));

APP.use('/api', router);

APP.listen(PORT, () => console.log('Server is running on port: ' + PORT));
