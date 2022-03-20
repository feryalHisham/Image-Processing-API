import sharp from 'sharp';

import { getPathForImage, getProcessedImagePathWithSize } from '../utilities/util';

const sharpResize = async (imageName: string, width: number, height: number) => {
  try {
    const processedImagePath = await getProcessedImagePathWithSize(imageName, width, height);
    await sharp(getPathForImage(imageName)).resize(width, height).toFile(processedImagePath);
  } catch (error) {
    console.log('Error resizing the image: ', error);
  }
};

export default sharpResize;
