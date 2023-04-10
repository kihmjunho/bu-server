import express from 'express';

import {
  createPost,
  deleteComment,
  deletePost,
  getComments,
  getPost,
  updateComment,
  updatePost,
  writeComment,
} from './post.controller';

import { imageUpload } from '../../middlewares';
import { authenticateUser } from '../../utils/auth';

const router = express.Router();

router.post('/', imageUpload.array('files'), createPost);

router
  .route('/:pid')
  .get(authenticateUser, getPost)
  .put(updatePost)
  .delete(deletePost);

router
  .route('/:pid/comments')
  .get(getComments)
  .post(writeComment)
  .put(updateComment);

router.delete('/:pid/comments/:cid', deleteComment);

export default router;
