import express from 'express';
import errorHandlerMiddleware from './error-middleware/error.middleware';
import { PORT } from './index.constants';
import routes from './routes';
import { getInputImagesPath } from './utilities/util';

const app = express();

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

app.use('/images', routes);

// To display the input images in the browser
app.use('/images', express.static(getInputImagesPath()));

app.use('/images', errorHandlerMiddleware);

// export app so that we can import it in spec file and test it
export default app;
