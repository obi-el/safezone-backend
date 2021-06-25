import express from 'express';
const apiRouter = express.Router();

import locationRouter from './location';

apiRouter.use('/location', locationRouter);

export default apiRouter;
