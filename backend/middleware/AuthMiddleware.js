import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const SECRET_KEY = process.env.JWT_SECRET;

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader)
    return res.status(403).json({ message: 'Token manquant' });

  const token = authHeader.split(' ')[1]; // "Bearer <token>"

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded; // ici on stocke les infos du token pour les routes suivantes
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token invalide ou expiré' });
  }
};
