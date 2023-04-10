import express from 'express';

import {
  deleteGuest,
  getGuest,
  postGuest,
  updateMessage,
} from './guest.controller';

const router = express.Router();

router.route('/').get(getGuest).post(postGuest);
router.route('/:gid').put(updateMessage).delete(deleteGuest);

export default router;
