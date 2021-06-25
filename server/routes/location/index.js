import mongoose from 'mongoose';
import express from 'express';
const locationRouter = express.Router();
import { addLocation, getLocation } from './location';


locationRouter.post('/', addLocation);
locationRouter.get('/', getLocation);

export default locationRouter;
