import sharpResize from '../sharp-resize/sharp-resize';
import fs from 'fs-extra';
import path from 'path';

describe('Resize image logic the tests', () => {
  it('Should call resize function successfully without errors', async () => {
    expect(async () => {
      await sharpResize('encenadaport.jpg', 600, 500);
    }).not.toThrow();
  });

  it('Should resize and output resized image successfully', async () => {
    await sharpResize('encenadaport.jpg', 800, 650);
    const resizedImageFound = await fs.pathExists(
      path.join(__dirname, '../assets/processed-images/encenadaport-800x650.jpg')
    );
    expect(resizedImageFound).toBeTruthy();
  });
});
