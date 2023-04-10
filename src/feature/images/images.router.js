import express from 'express';

import { getImages, updateImages, updateThumbnail } from './images.controller';

import { imageUpload } from '../../middlewares';

const router = express.Router();

router
  .route('/:table/:pid')
  .get(getImages)
  .put(imageUpload.array('files'), updateImages);
router.put('/:table/:pid/thumbnail', updateThumbnail);

export default router;
