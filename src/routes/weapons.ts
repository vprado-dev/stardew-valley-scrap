import { Router } from 'express';
import { weaponsGet } from '../endpoint/weapons';

const router = Router();

/**
 * GET /weapons
 * @tag weapons
 * @response 204
 * @response default
 * @responseContent {Error} default.application/json
 */

router.get('/weapons', weaponsGet);

export default router;
