import { Router } from 'express';
import { statusGet } from '../endpoint/status';

const router = Router();

/**
 * GET /status
 * @tag status
 * @response 204
 * @response default
 * @responseContent {Error} default.application/json
 */
router.get('/status', statusGet);

export default router;
