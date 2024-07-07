import { Request, Response, NextFunction } from 'express';
import ValidationException from './ValidationException';

const errorHandlingMiddleware = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(`Erro: ${error.stack}`);

  if (error instanceof ValidationException) {
    return res.status(error.statusCode).json({ message: error.message });
  }

  res.status(500).json({ message: 'Erro interno do servidor' });
};

export default errorHandlingMiddleware;