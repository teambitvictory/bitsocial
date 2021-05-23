import mongoose from 'mongoose';

const UserSchema = mongoose.Schema({
  userId: {
    type: String,
    required: true,
    index: true,
    unique: true,
    dropDups: true,
  },
});

const User = mongoose.model('User', UserSchema);

export default User;
