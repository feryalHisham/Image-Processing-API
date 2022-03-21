import sharp from 'sharp';

import { getPathForImage, getProcessedImagePathWithSize } from '../utilities/util';

const sharpResize = async (imageName: string, width: number, height: number): Promise<void> => {
  try {
    const processedImagePath = await getProcessedImagePathWithSize(imageName, width, height);
    await sharp(getPathForImage(imageName)).resize(width, height).toFile(processedImagePath);
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export default sharpResize;
