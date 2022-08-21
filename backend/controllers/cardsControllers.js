const Card = require('../models/card');
const ForbiddenError = require('../errors/ForbiddenError');
const NotFoundError = require('../errors/NotFoundError');
const { checkErrorValidation, checkErrorValidationId } = require('../errors/errors');

exports.getCards = (req, res, next) => {
  Card.find({})
    .populate('_id')
    .then((cards) => res.send({ data: cards }))
    .catch(next);
};

exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      checkErrorValidation(err, next);
    });
};

exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.cadrId)
    .orFail(() => { throw new NotFoundError('Карточка не найдена'); })
    .then((card) => {
      if (card.owner.toString() !== req.user._id) {
        throw new ForbiddenError('Нет прав на удаление карточки');
      }
      return card.remove();
    })
    .then(() => res.status(200).send({ message: `Вы удалили карточку: ${req.params.cadrId}` }))
    .catch((err) => {
      checkErrorValidationId(err, next);
    });
};

exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .orFail(() => { throw new NotFoundError('Такой карточки не найдено'); })
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => {
      console.log(err);
      checkErrorValidationId(err, next);
    });
};

exports.deleteLikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .orFail(() => { throw new NotFoundError('Такой карточки не найдено'); })
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => {
      checkErrorValidationId(err, next);
    });
};
