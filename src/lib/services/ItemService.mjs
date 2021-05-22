import Joi from 'joi';
import Item from '../db/Item.mjs';
import Like from '../db/Like.mjs';
import ConfigTypes from '../types/ConfigTypes.mjs';
import getConfig from './ConfigService.mjs';

const createItem = async (payload) => {
  const schema = Joi.object({
    id: Joi.string().alphanum().required(),
  });
  const { id } = await schema.validateAsync(payload);
  const newItem = new Item({ itemId: id });
  return newItem.save();
};

const like = async (user, payload) => {
  const allowedTypes = Object.values(getConfig(ConfigTypes.LIKE_TYPES))
    .map((likeType) => likeType.name);
  const schema = Joi.object({
    itemId: Joi.string().alphanum().required(),
    type: Joi.string().valid(...allowedTypes).required(),
  });
  const { itemId, type } = await schema.validateAsync(payload);
  const item = await Item.findOne({ itemId });

  const query = {
    user: user._id,
    item: item._id,
  };

  // TODO: Make it configurable if multiple different like types are allowed
  await Like.findOneAndUpdate(
    query,
    {
      ...query,
      type,
    },
    {
      upsert: true,
    },
  );
};

const getLikes = async (query) => Like.find(query);

const getLikesForItem = async (itemId) => {
  const schema = Joi.string().alphanum().required();
  const validatedItemId = await schema.validateAsync(itemId);
  const item = await Item.findOne({ itemId: validatedItemId });
  return getLikes({
    item: item._id,
  });
};

const getLikesForUser = async (user) => getLikes({
  user: user._id,
});

export {
  createItem, like, getLikesForItem, getLikesForUser,
};
