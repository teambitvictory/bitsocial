import Joi from 'joi';
import Profile from '../db/Profile.mjs';

const getProfileByUserId = async (userId) => {
  const schema = Joi.string().alphanum().required();
  const validatedUserId = await schema.validateAsync(userId);
  return Profile.findOne({ userId: validatedUserId });
};

const createProfile = async (userId) => {
  const schema = Joi.string().alphanum().required();
  const value = await schema.validateAsync(userId);
  const newProfile = new Profile({ userId: value });
  return newProfile.save();
};

export { createProfile, getProfileByUserId };
