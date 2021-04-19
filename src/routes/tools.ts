import { Router } from 'express';
import { toolsGet } from '../endpoint/tools';

const router = Router();

/**
 * GET /tools
 * @tag tools
 * @response 204
 * @response default
 * @responseContent {Error} default.application/json
 */
router.get('/tools', toolsGet);

export default router;
