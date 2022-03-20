import express from 'express';
import sharpResize from '../../sharp-resize/sharp-resize';
import { getProcessedImagePathWithSize } from '../../utilities/util';

// Create instance of Router for resizeImage route
const resizeImageRoute = express.Router();

resizeImageRoute.get('/', async (req, res) => {
  const imageName: string = req.query.image as string;
  const requiredWidth: number = parseInt(req.query.width as string);
  const requiredHeight: number = parseInt(req.query.height as string);
  try {
    await sharpResize(imageName, requiredWidth, requiredHeight);
    const processedImagePath = await getProcessedImagePathWithSize(
      imageName,
      requiredWidth,
      requiredHeight
    );
    res.sendFile(processedImagePath);
  } catch (error) {
    console.log('Error in response: ', error);
  }
});

export default resizeImageRoute;
