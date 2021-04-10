const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();
const User = require('../models/user');
const config = require('../utils/config');

usersRouter.get('/', async (request, response) => {
  if (config.NODE_ENV === 'development') {
    const users = await User.find({}).populate('long').populate('short');
    response.json(users.map((u) => u.toJSON()));
  }
  response.status(401).end();
});

usersRouter.post('/', async (request, response) => {
  if (config.NODE_ENV === 'development') {
    const body = request.body;

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(body.password, saltRounds);

    const user = new User({
      username: body.username,
      name: body.name,
      passwordHash,
    });

    const savedUser = await user.save();
    response.json(savedUser);
  }
  response.status(401).end()
});

module.exports = usersRouter