import mongoose from 'mongoose';

const LikeSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  item: {
    type: mongoose.Schema.ObjectId,
    ref: 'Item',
  },
  type: {
    type: String,
  },
});

const Like = mongoose.model('Like', LikeSchema);

export default Like;
