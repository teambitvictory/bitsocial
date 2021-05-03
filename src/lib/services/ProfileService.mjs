import Joi from 'joi';
import Profile from '../db/Profile.mjs';

const getProfileByUserId = async (userId) => {
  const schema = Joi.string().alphanum().required();
  const validatedUserId = schema.validate(userId);
  return Profile.findOne({ validatedUserId });
};

const createProfile = async (payload) => {
  const schema = Joi.object({
    id: Joi.string().alphanum().required(),
  });
  const value = await schema.validateAsync(payload);
  const newProfile = new Profile({ profileId: value.id });
  return newProfile.save();
};

export { createProfile, getProfileByUserId };
