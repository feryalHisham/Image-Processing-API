import express from 'express';
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
