const User = require('../model/User');
const { StatusCodes } = require('http-status-codes');
const { NotFoundError } = require('../error');

const GetProfileInfo = async (req, res,next) => {
  try {
  const createdBy = req.user.userId; 
  const user = await User.findById(createdBy).select('name email memberSince lastUpdated');
  if (!user) {
     throw new NotFoundError('User not found');
  }
  res.status(StatusCodes.OK).json({ user });
  } catch (error) {
       next(error);
  }
};
module.exports={GetProfileInfo}