import express from 'express';

import { getCategory } from './root.controller';

const router = express.Router();

router.get('/category', getCategory);

export default router;
