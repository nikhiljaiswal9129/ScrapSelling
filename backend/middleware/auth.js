import jwt from 'jsonwebtoken';
import User from '../models/order.js';
import cookieParser from 'cookie-parser';

export const authenticateUser = async (req, res, next) => {
  try {

    cookieParser()(req, res, () => {});

    const token = req.headers.access_token;
    console.log('token', JSON.stringify(req.headers.access_token) );
    
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    const decoded = jwt.verify(token, 'veryveryverysecret');
    // console.log("decode", decoded);

    const user = await User.findById(decoded.id);
    // console.log("user", user);

    if (!user) {
      return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
    // console.log('sooooo');

    req.User = user;
    // console.log('loooo');
    next();
  } catch (error) {
    console.error('Error authenticating user:', error);
    res.status(401).json({ message: 'Unauthorized: Invalid token' });
  }
};
