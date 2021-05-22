import Joi from 'joi';
import User from '../db/User.mjs';

const getUserById = async (userId) => {
  const schema = Joi.string().alphanum().required();
  const validatedUserId = await schema.validateAsync(userId);
  return User.findOne({ userId: validatedUserId });
};

const createUser = async (userId) => {
  const schema = Joi.string().alphanum().required();
  const validatedUserId = await schema.validateAsync(userId);
  const newUser = new User({ userId: validatedUserId });
  return newUser.save();
};

export { getUserById, createUser };
