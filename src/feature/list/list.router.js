import express from 'express';

import { getList } from './list.controller';

const router = express.Router();

router.get('/:cid/:related/:idx', getList);

export default router;
