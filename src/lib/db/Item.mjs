import mongoose from 'mongoose';

const ItemSchema = new mongoose.Schema({
  itemId: {
    type: String,
    required: true,
    index: true,
    unique: true,
    dropDups: true,
  },
});

const Item = mongoose.model('Item', ItemSchema);

export default Item;
