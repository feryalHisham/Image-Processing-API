import path from 'path';
import fs from 'fs-extra';

import { INPUT_IMAGES_PATH, PROCESSED_IMAGES_PATH } from './util.constants';

const getInputImagesPath = (): string => {
  return path.join(__dirname, INPUT_IMAGES_PATH);
};

const getProccessedImagesPath = async (): Promise<string> => {
  await fs.ensureDir(PROCESSED_IMAGES_PATH);
  return path.join(__dirname, PROCESSED_IMAGES_PATH);
};

const getPathForImage = (imageName: string): string => {
  const image = imageName.split('.')[0];
  const extension = imageName.split('.')[1];
  return path.join(getInputImagesPath(), `${image}.${extension}`);
};

const getProcessedImagePathWithSize = async (
  imageName: string,
  width: number,
  height: number
): Promise<string> => {
  const image = imageName.split('.')[0];
  const extension = imageName.split('.')[1];
  const outPath = await getProccessedImagesPath();
  return path.join(outPath, `${image}-${width}x${height}.${extension}`);
};

export {
  getInputImagesPath,
  getProccessedImagesPath,
  getPathForImage,
  getProcessedImagePathWithSize,
};
