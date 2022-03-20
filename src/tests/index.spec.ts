import supertest from 'supertest';
import fs from 'fs-extra';
import path from 'path';

import app from '../index';

const request = supertest(app);

describe('Endpoint tests', () => {
  it('Should GET the resizeImage API endpoint successfully', async () => {
    const response = await request.get('/images/resizeImage?image=fjord.jpg&height=400&width=600');
    expect(response.status).toBe(200);
  });

  it('Should GET the resizeImage API endpoint with Bad Request', async () => {
    const response = await request.get('/images/resizeImage?image=fjord.jpg&height=400');
    expect(response.status).toBe(400);
  });

  it('Should GET the resizeImage API endpoint with 404 code (Image not found)', async () => {
    const response = await request.get(
      '/images/resizeImage?image=fjord11.jpg&height=400&width=600'
    );
    expect(response.status).toBe(404);
  });

  it('Should GET the resizeImage API endpoint with error message `Image name with extension is missing` ', async () => {
    const response = await request.get('/images/resizeImage?height=400&&width=600');
    expect(response.body.error).toBe('Image name with extension is missing');
  });

  it('Should GET the resizeImage API endpoint with error message `Width and Height must be numbers` ', async () => {
    const response = await request.get('/images/resizeImage?image=fjord.jpg&height=400&width=str');
    expect(response.body.error).toBe('Width and Height must be numbers');
  });
});

describe('Image Procsessing Logic tests', () => {
  it('Should not find an image that has not been requested before in processed images folder', async () => {
    const imageNotProcessed = await fs.pathExists(
      path.join(__dirname, '../assets/processed-images/fjord-400x200.jpg')
    );
    expect(imageNotProcessed).toBeFalsy();
  });

  it('Should resize an image and place it in processed images folder for upcoming access', async () => {
    await request.get('/images/resizeImage?image=fjord.jpg&height=200&width=400');
    const resizedImageFound = await fs.pathExists(
      path.join(__dirname, '../assets/processed-images/fjord-400x200.jpg')
    );
    expect(resizedImageFound).toBeTruthy();
  });

  it('Can resize the same image with different size (width and height)', async () => {
    await request.get('/images/resizeImage?image=fjord.jpg&height=500&width=650');
    const resizedImageFound = await fs.pathExists(
      path.join(__dirname, '../assets/processed-images/fjord-650x500.jpg')
    );
    expect(resizedImageFound).toBeTruthy();
  });
});
