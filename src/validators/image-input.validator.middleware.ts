import express from 'express';
import { imageExists } from '../utilities/util';

const inputImageValidationMiddleware = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): Promise<express.Response | undefined> => {
  if (!req.query.image) {
    return res.status(400).send({ error: 'Image name with extension is missing' });
  }
  if ((req.query.image as string).split('.').length === 1) {
    return res.status(400).send({ error: 'Image extenstion is missing' });
  }
  const isImageExists = await imageExists(req.query.image as string);
  if (!isImageExists) {
    return res.status(404).send({ error: "Requested image doesn't exist." });
  }
  next();
};

const dimensionsValidationMiddleware = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): express.Response | undefined => {
  if (!req.query.width) {
    return res.status(400).send({ error: 'Width is missing' });
  }
  if (!req.query.height) {
    return res.status(400).send({ error: 'Height is missing' });
  }

  const widthAsNumber = parseInt(req.query.width as string);
  const heightAsNumber = parseInt(req.query.height as string);
  if (Number.isNaN(widthAsNumber) || Number.isNaN(heightAsNumber)) {
    return res.status(400).send({ error: 'Width and Height must be numbers' });
  }

  if (widthAsNumber <= 0 || heightAsNumber <= 0) {
    return res
      .status(400)
      .send({ error: 'Width and Height must be positive numbers greater than 0' });
  }
  next();
};

export { inputImageValidationMiddleware, dimensionsValidationMiddleware };
