import express from 'express';

import {
  addExhibition,
  deleteExhibition,
  getExhibitionDetail,
  getExhibitionList,
  updateExhibition,
} from './exhibition.controller';
import { imageUpload } from '../../middlewares';

const router = express.Router();

router.post('/', imageUpload.array('files'), addExhibition);
router.get('/type/:type', getExhibitionList);
router
  .route('/detail/:eid')
  .get(getExhibitionDetail)
  .put(updateExhibition)
  .delete(deleteExhibition);

export default router;
