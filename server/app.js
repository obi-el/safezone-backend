require('@babel/polyfill');
require('dotenv').config();

import express from 'express';
import bp from 'body-parser';
import compression from 'compression';
import mongoose from 'mongoose';
import morgan from 'morgan'
import apiRouter from './routes/api';

const app = express();

mongoose.connect(`${process.env.DB_URL}/${process.env.DB_NAME}`, { useNewUrlParser: true });
export const connection = mongoose.connection;

connection.once('open', function() {
	console.log('MongoDB database connection established successfully');
}).on('error', (error) => {
	console.warn('Error : ',error);
});

app.use(compression());
app.use(bp.urlencoded({ extended: false }));
app.use(bp.json({ limit: '100mb' }));

if(process.env.NODE_ENV === 'DEV') {
	app.use(morgan('dev'));
} else if(process.env.NODE_ENV === 'PROD') {
	app.use(morgan('tiny'));
}

////////API ROUTES/////////

app.use('/api', apiRouter);

//////////////////////////



let server = app.listen(process.env.PORT, () => {
	server.emit(process.env.SERVER_STARTED);
});

server.on('close', async err => {
	if(err) throw err;

	console.log('\nClosing db connections...\n');
	await mongoose.disconnect();
	console.log('Server Out!! *drops mic*');
});

process.on('SIGINT', () => { server.close()} );

console.log('Magic happens at http://localhost:' + process.env.PORT);

export default server;
