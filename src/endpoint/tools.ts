import { endpoint } from '../functions/endpoint';

export const toolsGet = endpoint(async (req, res) => {
  res.status(204).end();
});
