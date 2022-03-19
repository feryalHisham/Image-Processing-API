import path from 'path';

const getInputImagesPath = (): string => {
  return path.join(__dirname, '../assets/images');
};

const getProccessedImagesPath = (): string => {
  return path.join(__dirname, '../assets/processed-images');
};

const getPathForImage = (imageName: string): string => {
  const image = imageName.split('.')[0];
  const extension = imageName.split('.')[1];
  return path.join(getInputImagesPath(), `${image}.${extension}`);
};

const getProcessedImagePathWithSize = (
  imageName: string,
  width: number,
  height: number
): string => {
  const image = imageName.split('.')[0];
  const extension = imageName.split('.')[1];
  return path.join(getProccessedImagesPath(), `${image}-${width}x${height}.${extension}`);
};

export {
  getInputImagesPath,
  getProccessedImagesPath,
  getPathForImage,
  getProcessedImagePathWithSize,
};
