import express from 'express';

import {
  signupUser,
  loginUser,
  duplicateCheck,
  changePassword,
} from './user.controller';

const router = express.Router();

router.post('/check', duplicateCheck);
router.post('/signup', signupUser);
router.post('/login', loginUser);
router.put('/change', changePassword);

export default router;
