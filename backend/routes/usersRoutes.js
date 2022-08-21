const express = require('express');
const { celebrate, Joi } = require('celebrate');
const {
  getUsers, getUserById, updateProfil, updateAvatar,
} = require('../controllers/usersControllers');

const userRoutes = express.Router();

const redex = require('../utils/utils');

userRoutes.get('/users', getUsers);

userRoutes.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(30).required(),
  }).unknown(true),
}), updateProfil);

userRoutes.get('/users/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().alphanum().hex().length(24),
  }).unknown(true),
}), getUserById);

userRoutes.patch('/users/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().pattern(redex),
  }).unknown(true),
}), updateAvatar);

module.exports = userRoutes;
