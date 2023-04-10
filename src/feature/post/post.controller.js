import { randomUUID } from 'crypto';

import { getBody } from '../../utils/body';
import { insertImages, getImages, deleteImages } from '../../utils/images';

import { conn } from '../../config/conn';
import {
  createPostQuery,
  deleteCommentQuery,
  deleteCommentsQuery,
  deletePostQuery,
  getCommentsQuery,
  getPostQuery,
  updateCommentQuery,
  updatePostQuery,
  updateViewQuery,
  writeCommentQuery,
} from './post.query';

export const createPost = async (req, res) => {
  const postId = randomUUID();
  const body = getBody(JSON.parse(JSON.stringify(req.body)));
  const { fileList, thumbnail } = insertImages(req.files);
  const date = new Date();

  try {
    const data = [postId, ...body, fileList, thumbnail, date];
    await conn.query(createPostQuery, data);

    const postPath = id => {
      if (id === 6) return `artwork-drawing`;
      if (id === 7) return `artwork-painting`;
      if (id === 8) return `artwork-photohraphy`;
      if (id === 9) return `artwork-digital`;
      if (id === 10) return `board-notice`;
      if (id === 11) return `board-essay`;
    };

    res.status(201).json({
      message: 'post created successfully',
      postUrl: `/${postPath(parseInt(req.body.category_id))}/${postId}`,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getPost = async (req, res) => {
  const { pid } = req.params;
  const [result] = await conn.query(getPostQuery, pid);

  if (!result[0]) return res.status(201).json({ result: false });

  const {
    postId,
    title,
    metaText,
    thumbnail,
    description,
    size,
    materials,
    year,
    price,
    collector,
    fileList,
    user_id,
    category_id,
    name,
  } = result[0];
  const { images } = getImages(fileList, thumbnail);

  const data = {
    postId,
    thumbnail,
    title,
    metaText,
    description,
    size,
    materials,
    year,
    price,
    collector,
    images,
    userId: user_id,
    categoryId: category_id,
    name,
  };

  if (req.userId !== user_id) await conn.query(updateViewQuery, pid);
  return res.status(201).json(data);
};

export const updatePost = async (req, res) => {
  const { pid } = req.params;
  const body = getBody(req.body);

  try {
    await conn.query(updatePostQuery, [...body, pid]);
    res.status(201).json({ message: 'post updated successfully', pid });
  } catch (error) {
    console.error(error);
  }
};

export const deletePost = async (req, res) => {
  const { pid } = req.params;

  try {
    const [result] = await conn.query(getPostQuery, pid);
    deleteImages(result[0].fileList);

    await conn.query(deletePostQuery, pid);
    await conn.query(deleteCommentsQuery, pid);

    res.status(201).json({ message: 'post deleted successfully' });
  } catch (error) {
    console.log(error);
  }
};

export const getComments = async (req, res) => {
  const { pid } = req.params;
  try {
    const [comments] = await conn.query(getCommentsQuery, pid);
    res.status(201).json(comments);
  } catch (error) {
    console.log(error);
  }
};

export const writeComment = async (req, res) => {
  const commentId = randomUUID();
  const { pid } = req.params;
  const body = getBody(req.body);
  const date = new Date();

  try {
    const data = [commentId, ...body, pid, date];
    await conn.query(writeCommentQuery, data);
    res.status(201).json({ message: 'comment created successfully' });
  } catch (error) {}
};

export const updateComment = async (req, res) => {
  const { commentId, comment } = req.body;
  const commentArray = comment.replaceAll(/(\n|\r\n)/g, '[//]');

  const data = [commentArray, commentId];

  try {
    await conn.query(updateCommentQuery, data);
    res.status(201).json({ message: 'comment updated successfully' });
  } catch (error) {
    console.log(error);
  }
};

export const deleteComment = async (req, res) => {
  const { cid } = req.params;

  try {
    await conn.query(deleteCommentQuery, cid);
    res.status(201).json({ message: 'comment deleted successfully' });
  } catch (error) {
    console.log(error);
  }
};
