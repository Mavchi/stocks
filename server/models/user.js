const mongoose = require('mongoose');
const uniquevalidator = require('mongoose-unique-validator');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 3,
    unique: true,
  },
  name: {
    type: String,
    minlength: 3,
    required: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  favourited: {
    long: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Stock',
      },
    ],
    short: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Stock',
      },
    ],
  },
});

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwordHash;
  },
});

userSchema.plugin(uniquevalidator);

module.exports = mongoose.model('User', userSchema);
