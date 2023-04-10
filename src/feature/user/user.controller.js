import { randomUUID } from 'crypto';
import bcrypt from 'bcrypt';

import { conn } from '../../config/conn';
import { newToken } from '../../utils/auth';

import { signupQuery, updatePassword, userQuery } from './user.query';

export const duplicateCheck = async (req, res) => {
  const [result] = await conn.query(userQuery, req.body.username);
  if (result[0]) return res.status(201).json({ response: false });
  return res.status(201).json({ response: true });
};

export const signupUser = async (req, res) => {
  const userId = randomUUID();
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 5);
  const date = new Date();

  const data = [userId, username, hashedPassword, date];

  try {
    await conn.query(signupQuery, data);
    return res.status(201).json('회원이 되셨습니다');
  } catch (error) {
    console.log(error);
  }
};

export const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    const [result] = await conn.query(userQuery, username);
    if (!result[0]) return res.status(401).json('일치하는 사용자가 없습니다');

    const response = await bcrypt.compare(password, result[0].password);
    if (!response) return res.status(401).json('비밀번호가 일치하지 않습니다');

    const accessToken = newToken(result);

    const loginUser = {
      userId: result[0].userId,
      username: result[0].username,
    };

    res.status(201).json({ accessToken, loginUser });
  } catch (error) {
    console.log(error);
  }
};

export const changePassword = async (req, res) => {
  const { username, password, change } = req.body;

  try {
    const [result] = await conn.query(userQuery, username);
    if (!result[0]) return res.status(401).json('일치하는 사용자가 없습니다');

    const response = await bcrypt.compare(password, result[0].password);
    if (!response) return res.status(401).json('비밀번호가 일치하지 않습니다');

    const hashedPassword = await bcrypt.hash(change, 5);
    await conn.query(updatePassword, [hashedPassword, username]);

    res.status(201).json({ message: 'change' });
  } catch (error) {
    console.log(error);
  }
};
