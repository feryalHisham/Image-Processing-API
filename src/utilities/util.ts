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

/**
 * Returns a promise that resloves to true if image with required width and height already exists, false otherwise
 */
const imageWithRequiredSizeExists = async (
  imageName: string,
  width: number,
  height: number
): Promise<boolean> => {
  try {
    const path = await getProcessedImagePathWithSize(imageName, width, height);
    return fs.pathExists(path);
  } catch (error) {
    console.log('Error checking image exists ', error);
    return false;
  }
};

const imageExists = async (imageName: string): Promise<boolean> => {
  return fs.pathExists(getPathForImage(imageName));
};

export {
  getInputImagesPath,
  getProccessedImagesPath,
  getPathForImage,
  getProcessedImagePathWithSize,
  imageWithRequiredSizeExists,
  imageExists,
};
