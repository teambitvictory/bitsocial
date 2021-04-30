import mongoose from 'mongoose';

const ItemSchema = new mongoose.Schema({
  itemId: {
    type: String,
    required: true,
    index: true,
    unique: true,
  },
  likedBy: [{
    type: mongoose.Schema.ObjectId,
    ref: 'Profile',
  }],
});

const Item = mongoose.model('Item', ItemSchema);

export default Item;
