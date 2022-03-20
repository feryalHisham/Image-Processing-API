# Image Processing API

## Overview
An API that can be used in two different ways. As a simple placeholder API, the first allows you to place images into your frontend with the size set via URL parameters for rapid prototyping. The second use case is as a library to serve properly scaled versions of your images to the front end to reduce page load size. Rather than needing to resize and upload multiple copies of the same image to be used throughout your site, the API you create will handle resizing and serving stored images for you.

## How to start the server?
### Prerequisites
Before you can run this project you need to install the following:
 - [Node.js](https://nodejs.org/en/download/)
- Check that Node.js is installed by typing `node --version` in the terminal (or cmd)

### Install the dependencies
Clone the project and in the root directory open the terminal and type `npm install` to install the needed dependencies to run the project

### Start the server
To start the server run the command `npm run start`. The server is now up and listening on port 3000

You can also compile to JS and run the compiled JS in `dist/` folder using the command `npm run start-node`. The server is also up and running at the same port.

## How to request the image resize API?
In your browser go to `localhost:3000` and request the image resize endpoint passing the required parameters as following:

  `localhost:3000/images/resizeImage?image=[image.extension]&width=[requiredWidth]&height=[requiredheight]`. 

For example, `http://localhost:3000/images/resizeImage?image=fjord.jpg&height=400&width=400`

The API can:

 - Resize the image with different dimensions.
 - Store the resized images for future access to avoid processing the image again.
 - Handle images with different extensions ex: .`jpg` and `.png`
 - Validate missing or incorrect parameters and sends back a suitable response .

#### Available Images

 -  `encenadaport.jpg`
 -  `fjord.jpg`
 -  `icelandwaterfall.jpg`
 -  `palmtunnel.jpg`
 -  `santamonica.jpg`
 - `field.png`

## Testing
To run the specs use the command `npm run test`. 

## Formatting and Linting
To apply prettier formatting run `npm run format`.
To apply linting run `npm run lint`.

## Implementation
This project is developed with `TypeScript` and using:
- [Node.js](https://nodejs.org/en/download/)
- [Express](https://expressjs.com/)
- [Sharp](https://sharp.pixelplumbing.com/) for resizing the images
- [fs-extra](https://www.npmjs.com/package/fs-extra) for handling file system

### Project structure and files

```bash
─src
    │   index.constants.ts
    │   index.ts
    │
    ├───assets
    │   ├───images
    │   │       encenadaport.jpg
    │   │       field.png
    │   │       fjord.jpg
    │   │       icelandwaterfall.jpg
    │   │       palmtunnel.jpg
    │   │       santamonica.jpg
    │   │
    │   └───processed-images
    │           field-400x400.png
    │           field-600x400.png
    │           fjord-500x400.jpg
    │
    ├───error-middleware
    │       error.middleware.ts
    │
    ├───routes
    │   │   index.ts
    │   │
    │   └───api
    │           resize-image.ts
    │
    ├───sharp-resize
    │       sharp-resize.ts
    │
    ├───tests
    │   │   index.spec.ts
    │   │
    │   └───helpers
    │           reporter.ts
    │
    ├───utilities
    │       util.constants.ts
    │       util.ts
    │
    └───validators
            image-input.validator.middleware.ts
```

- `index.ts` creates an instance of express application and is used to setup a server at port `3000`. Also hooks the validation and error handling middleware.
- `util.ts` has the utiltiies function such as getting the image path for input images and processed images
- Specs are included in `tests/index.spec.ts`
- The image resizing logic can be found in `sharp-resize/sharp-resize.ts` module
- The api routes are under `routes/api` directory, where `resize-image.ts` has the api handling the  `resizeImage` route.
- Validation middleware is located in `validators` folder
- Error handling middleware is located in `error-middleware` folder
- `assets` folder contains the input images inside `images` folder. The resized images are saved to `processed-images` folder.
