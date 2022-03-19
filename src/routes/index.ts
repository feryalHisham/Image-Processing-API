import express from 'express';
import resizeImageRoute from './api/resize-image';

const routes = express.Router();

// When browser requests 'resizeImage' route the resizeImageRoute will handle it
routes.use('/resizeImage', resizeImageRoute);

export default routes;
