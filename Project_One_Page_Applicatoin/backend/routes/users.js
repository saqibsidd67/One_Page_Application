const express = require('express');
const router = express.Router(); 
const bcrypt = require('bcrypt'); //ML: import bcrypt for password hashing
const { users } = require('../models/models'); //ML: import users model here
const saltRounds = 10; //ML: Number of saltRounds for bcrypt
const salt = bcrypt.genSaltSync(saltRounds); //ML: generate salt for bcrypt

//ML: POST /users/login - login function
router.post('/login', async (req, res, next) => {
  try {
    const { username, password} = req.body;
    const user = await users.findOne({ username: username });
    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }
    const isMatch = await bcrypt.compare(password, user.password); 
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }
    else {
      res.status(200).json(user);
    }
  } catch (err) {
    next(err);
  }
});

//ML: GET /users - retrieve all users
router.get('/', async (req, res, next) => {
  try {
    const userList = await users.find();
    res.send(userList);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
