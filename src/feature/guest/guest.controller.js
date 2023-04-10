import { randomUUID } from 'crypto';

import { getBody } from '../../utils/body';

import { conn } from '../../config/conn';
import {
  createGuestQuery,
  getGuestQuery,
  updateMessageQuery,
} from './guest.query';

export const getGuest = async (req, res) => {
  try {
    const [result] = await conn.query(getGuestQuery);
    res.status(201).json(result);
  } catch (error) {
    console.log(error);
  }
};

export const postGuest = async (req, res) => {
  const guestId = randomUUID();
  const body = getBody(req.body);
  const date = new Date();
  try {
    const data = [guestId, ...body, date];
    await conn.query(createGuestQuery, data);
    res.status(201).json({ message: 'message created successfully' });
  } catch (error) {
    console.log(error);
  }
};

export const updateMessage = async (req, res) => {
  try {
    const data = [...getBody(req.body)];
    const [result] = await conn.query(updateMessageQuery, data);
    if (result) {
      return res.status(201).json({ message: 'comment updated successfully' });
    }
  } catch (error) {
    console.log(error);
  }
};

export const deleteGuest = async (req, res) => {
  const { gid } = req.params;

  const sql = `
    delete from bu_guest where guestId = ?
  `;

  try {
    const [result] = await conn.query(sql, gid);
    if (result) {
      res.status(201).json({ message: 'comment deleted successfully' });
    }
  } catch (error) {
    console.log(error);
  }
};
