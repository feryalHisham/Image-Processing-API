import sharp from 'sharp';

import { getPathForImage, getProcessedImagePathWithSize } from '../utilities/util';

const sharpResize = async (imageName: string, width: number, height: number) => {
  try {
    await sharp(getPathForImage(imageName))
      .resize(width, height)
      .toFile(getProcessedImagePathWithSize(imageName, width, height));
  } catch (error) {
    console.log('Error resizing the image: ', error);
  }
};

export default sharpResize;
