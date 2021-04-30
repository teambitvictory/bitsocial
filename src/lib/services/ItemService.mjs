import Joi from 'joi';
import Item from '../db/Item.mjs';
import Profile from '../db/Profile.mjs';

const createItem = async (payload) => {
  const schema = Joi.object({
    id: Joi.string().alphanum().required(),
  });
  const value = await schema.validateAsync(payload);
  const newItem = new Item({ itemId: value.id });
  return newItem.save();
};

const like = async (profileId, value) => {
  const schema = Joi.string().alphanum().required();
  const itemId = await schema.validateAsync(value);
  const profile = await Profile.findOne({ profileId });
  const item = await Item.findOneAndUpdate(
    { itemId },
    { $push: { likedBy: profile._id } },
  );
  profile.likedItems.push(item._id);
  await profile.save();
};

export { createItem, like };
