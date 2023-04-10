import jwt from 'jsonwebtoken';

const { SECRET_KEY } = process.env;

const verifyToken = token => {
  return jwt.verify(token, SECRET_KEY);
};

export const newToken = user => {
  const payload = {
    user: user[0].username,
    userId: user[0].userId,
  };

  return jwt.sign({ payload }, SECRET_KEY);
};

export const authenticateUser = async (req, res, next) => {
  if (req.headers.authentication) {
    const { authentication } = req.headers;

    try {
      const { payload } = await verifyToken(authentication);
      req.userId = payload.userId;
    } catch (e) {
      return res.status(401).json({ message: 'token is invalid' });
    }
  }

  next();
};
