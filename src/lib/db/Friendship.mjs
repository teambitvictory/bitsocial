import mongoose from 'mongoose';

const FriendshipSchema = mongoose.Schema({
  invitingUser: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  invitedUser: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  status: {
    type: String,
    enum: ['OPEN', 'CONFIRMED'],
    default: 'OPEN',
  },
});

const Friendship = mongoose.model('Friendship', FriendshipSchema);

export default Friendship;
