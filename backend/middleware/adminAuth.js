
import jwt from 'jsonwebtoken';
import Admin from '../models/admin' 


const adminAuth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const admin = await Admin.findOne({ _id: decoded._id });

    if (!admin) {
      throw new Error();
    }

    req.admin = admin;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Unauthorized' });
  }
};

module.exports = adminAuth;
