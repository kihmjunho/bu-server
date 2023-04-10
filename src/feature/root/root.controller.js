import { conn } from '../../config/conn';

import { categoryQuery } from './root.query';

export const getCategory = async (req, res) => {
  try {
    const [result] = await conn.query(categoryQuery);
    res.status(201).json(result);
  } catch (error) {
    console.log(error);
  }
};
