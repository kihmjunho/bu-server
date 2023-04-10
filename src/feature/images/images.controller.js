import { insertImages, deleteImages } from '../../utils/images';

import { conn } from '../../config/conn';
import {
  getImagesQuery,
  imagesUpdateQuery,
  thumbnailUpdateQuery,
} from './images.query';

export const getImages = async (req, res) => {
  const { table, pid } = req.params;

  try {
    const [result] = await conn.query(getImagesQuery(table), pid);
    res.status(201).json(result);
  } catch (error) {
    console.log(error);
  }
};

export const updateImages = async (req, res) => {
  try {
    const { table, pid } = req.params;

    const [result] = await conn.query(getImagesQuery(table), pid);
    deleteImages(result[0].filenames);

    const { fileList, thumbnail } = insertImages(req.files);
    const data = [fileList, thumbnail, pid];

    await conn.query(imagesUpdateQuery(table), data);
    res.status(201).json({ message: 'images updated successfully' });
  } catch (error) {
    console.log(error);
  }
};

export const updateThumbnail = async (req, res) => {
  const { table, pid } = req.params;
  const { thumbnail } = req.body;

  const data = [thumbnail, pid];

  try {
    await conn.query(thumbnailUpdateQuery(table), data);
    res.status(201).json({ message: 'thumbnail updated successfully' });
  } catch (error) {
    console.log(error);
  }
};
