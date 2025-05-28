import jwt from 'jsonwebtoken';

export const verifyToken = (token) => {
  try {
    if (!token) return null;
    const decoded = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET);
    return { id: decoded.id };
  } catch {
    return null;
  }
};