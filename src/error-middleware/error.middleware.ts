import express from 'express';

/**
 * Handles errors thrown to respond with 500 (Internal Server Error)
 * @param error error thrown from try/catch blocks
 * @param req request
 * @param res response
 * @param next nexFunction
 */
const errorHandlerMiddleware = async (
  error: Error,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  console.log('Server error: ', error);
  res.status(500).send({ error: `Internal Server Error: ${error.message}` });
  next();
};

export default errorHandlerMiddleware;
