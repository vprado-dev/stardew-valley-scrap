import { RequestHandler } from 'express';

export const toolsGet: RequestHandler = (req, res) => {
  res.status(204).end();
};
