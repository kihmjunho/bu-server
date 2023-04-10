import { randomUUID } from 'crypto';

import { getBody } from '../../utils/body';
import { insertImages, getImages, deleteImages } from '../../utils/images';

import { conn } from '../../config/conn';

import {
  createExhibitionQuery,
  deleteExhibitionQuery,
  getExhibitionDetailQuery,
  getExhibitionListQuery,
  updateExhibitionQuery,
} from './exhibition.query';

export const getExhibitionList = async (req, res) => {
  const { type } = req.params;

  try {
    const [result] = await conn.query(getExhibitionListQuery);

    if (type === 'solo') {
      let soloExhibition = [];
      result.forEach(item => {
        if (item.solo === 1) {
          soloExhibition.push(item);
        }
      });
      return res.status(201).json(soloExhibition);
    }

    if (type === 'group') {
      let groupExhibition = [];
      result.forEach(item => {
        if (item.solo === 0) {
          groupExhibition.push(item);
        }
      });
      return res.status(201).json(groupExhibition);
    }

    return res.status(201).json(result);
  } catch (error) {
    console.log(error);
  }
};

export const addExhibition = async (req, res) => {
  const exhibitionId = randomUUID();

  const body = getBody(JSON.parse(JSON.stringify(req.body)));
  const { fileList, thumbnail } = insertImages(req.files);

  try {
    const data = [exhibitionId, ...body, fileList, thumbnail];

    await conn.query(createExhibitionQuery, data);

    const postPath = type => {
      if (type === 1) return `exhibition-solo`;
      return `exhibition-group`;
    };

    res.status(201).json({
      message: 'exhibition created successfully',
      postUrl: `/${postPath(parseInt(req.body.solo))}/${exhibitionId}`,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getExhibitionDetail = async (req, res) => {
  const { eid } = req.params;

  try {
    const [result] = await conn.query(getExhibitionDetailQuery, eid);

    const {
      title,
      anotherTitle,
      metaText,
      description,
      solo,
      year,
      start,
      end,
      location,
      city,
      prefaceTitle,
      prefaceAuthor,
      prefaceDescription,
      etc,
      fileList,
      thumbnail,
    } = result[0];

    const { images } = getImages(fileList, thumbnail);

    const data = {
      title,
      anotherTitle,
      metaText,
      description,
      solo,
      year,
      start,
      end,
      location,
      city,
      prefaceTitle,
      prefaceAuthor,
      prefaceDescription,
      etc,
      thumbnail,
      images,
    };

    res.status(201).json(data);
  } catch (error) {
    console.log(error);
  }
};

export const updateExhibition = async (req, res) => {
  const { eid } = req.params;
  const body = getBody(req.body);
  try {
    await conn.query(updateExhibitionQuery, [...body, eid]);
    res.status(201).json({ message: 'post updated successfully' });
  } catch (error) {
    console.log(error);
  }
};

export const deleteExhibition = async (req, res) => {
  try {
    const { eid } = req.params;
    const [result] = await conn.query(getExhibitionDetailQuery, eid);
    deleteImages(result[0].fileList);
    await conn.query(deleteExhibitionQuery, eid);
    res.status(201).json({ message: 'exhibition deleted successfully' });
  } catch (error) {
    console.log(error);
  }
};
