import mongoose from 'mongoose';

const ProfileSchema = mongoose.Schema({
  userId: {
    type: String,
    required: true,
    index: true,
    unique: true,
  },
  likedItems: [{
    type: mongoose.Schema.ObjectId,
    ref: 'Item',
  }],
});

const Profile = mongoose.model('Profile', ProfileSchema);

export default Profile;
