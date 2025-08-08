const HealthGoal = require('../model/HealthGoal')
const { StatusCodes } = require('http-status-codes');
const { BadRequestError } = require('../error');

const getHealthGoal = async (req, res,next) => {
  try {
    const createdBy = req.user.userId;
    const goals = await HealthGoal.find({ createdBy }).sort({ createdAt: -1 });
    res.status(StatusCodes.OK).json({ goals });
  } catch (error) {
    next(error);
  }
};
const addHealthGoal = async (req, res,next) => {
  try {
    const createdBy = req.user.userId;
    const { description, targetDate } = req.body;
    if (!description || description.trim() === '') {
      throw new BadRequestError('Goal description is required');
    }
    const newGoal = await HealthGoal.create({
      createdBy,
      description,
      targetDate: targetDate || null,
    });
    res.status(StatusCodes.CREATED).json({ goal: newGoal });
  } catch (error) {
    next(error);
  }
};
module.exports = {
  getHealthGoal,
  addHealthGoal
}