import Joi from 'joi';
import Friendship from '../db/Friendship.mjs';
import User from '../db/User.mjs';

const getFriendships = (user) => Friendship.find().or([
  {
    invitingUser: user._id,
  }, {
    invitedUser: user._id,
  },
]);

const getFriends = async (user) => getFriendships(user).and({
  status: 'CONFIRMED',
});

const getOpenFriendRequests = async (user) => getFriendships(user).and({
  status: 'OPEN',
});

const createFriendRequest = async (user, otherUserId) => {
  const schema = Joi.string().alphanum().required();
  const validatedOtherUserId = await schema.validateAsync(otherUserId);
  const otherUser = await User.findOne({ userId: validatedOtherUserId });
  const existingFriendRequest = await Friendship.findOne().or([
    {
      invitingUser: user._id,
      invitedUser: otherUser._id,
    }, {
      invitingUser: otherUser._id,
      invitedUser: user._id,
    },
  ]);

  if (existingFriendRequest) {
    return Promise.reject({
      status: 409,
      message: 'Friendship or friend request already exists',
    });
  }

  const newFriendship = new Friendship({
    invitingUser: user._id,
    invitedUser: otherUser._id,
  });
  return newFriendship.save();
};

const getFriendShip = async (user, friendshipId, status) => {
  const schema = Joi.string().alphanum().required();
  const validatedFriendshipId = await schema.validateAsync(friendshipId);
  const friendship = await Friendship.findOne().or([
    {
      _id: validatedFriendshipId,
      invitingUser: user._id,
    }, {
      _id: validatedFriendshipId,
      invitedUser: user._id,
    },
  ]).and({
    status,
  });
  return friendship || Promise.reject({
    status: 404,
    message: 'Friendship does not exist',
  });
};

const removeFriendship = async (user, friendshipId, status = 'CONFIRMED') => {
  const friendship = await getFriendShip(user, friendshipId, status);
  await friendship.remove();
};

const updateFriendRequest = async (user, friendshipId, payload) => {
  const schema = Joi.object({
    accepted: Joi.bool().required(),
  });
  const { accepted } = await schema.validateAsync(payload);
  if (accepted) {
    const friendRequest = await getFriendShip(user, friendshipId, 'OPEN');

    if (!friendRequest.invitedUser._id.equals(user._id)) {
      return Promise.reject({
        status: 401,
        message: 'Only the invited user can accept a friend request',
      });
    }

    friendRequest.status = 'CONFIRMED';
    return friendRequest.save();
  }
  return removeFriendship(user, friendshipId, 'OPEN');
};

export {
  getFriends,
  createFriendRequest,
  getOpenFriendRequests,
  updateFriendRequest,
  removeFriendship,
};
