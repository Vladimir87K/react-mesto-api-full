const express = require('express');
const { celebrate, Joi } = require('celebrate');

const cardsRouters = express.Router();
const redex = require('../utils/utils');
const {
  getCards, createCard, deleteCard, likeCard, deleteLikeCard,
} = require('../controllers/cardsControllers');

cardsRouters.get('/cards', getCards);

cardsRouters.post('/cards', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().pattern(redex),
  }).unknown(true),
}), createCard);

cardsRouters.delete('/cards/:cadrId', celebrate({
  params: Joi.object().keys({
    cadrId: Joi.string().alphanum().hex().length(24),
  }).unknown(true),
}), deleteCard);

cardsRouters.put('/cards/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().hex().length(24),
  }).unknown(true),
}), likeCard);

cardsRouters.delete('/cards/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().hex().length(24),
  }).unknown(true),
}), deleteLikeCard);

module.exports = cardsRouters;
