import express, { NextFunction } from 'express';
import sharpResize from '../../sharp-resize/sharp-resize';
import { getProcessedImagePathWithSize, imageWithRequiredSizeExists } from '../../utilities/util';
import {
  dimensionsValidationMiddleware,
  inputImageValidationMiddleware,
} from '../../validators/image-input.validator.middleware';

// Create instance of Router for resizeImage route
const resizeImageRoute = express.Router();
const middlewares = [inputImageValidationMiddleware, dimensionsValidationMiddleware];

resizeImageRoute.get(
  '/',
  middlewares,
  async (req: express.Request, res: express.Response, next: NextFunction) => {
    const imageName: string = req.query.image as string;
    const requiredWidth: number = parseInt(req.query.width as string);
    const requiredHeight: number = parseInt(req.query.height as string);
    try {
      const imageExists = await imageWithRequiredSizeExists(
        imageName,
        requiredWidth,
        requiredHeight
      );
      if (!imageExists) {
        await sharpResize(imageName, requiredWidth, requiredHeight);
      }
      const processedImagePath = await getProcessedImagePathWithSize(
        imageName,
        requiredWidth,
        requiredHeight
      );
      res.sendFile(processedImagePath);
    } catch (error) {
      next(error);
    }
  }
);

export default resizeImageRoute;
