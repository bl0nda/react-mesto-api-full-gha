const Card = require('../models/card');

const ValidationError = require('../errors/validation-err');
const NotFoundError = require('../errors/not-found-err');
const ForbiddenError = require('../errors/forbidden-err');

module.exports.getCards = (req, res, next) => {
  Card
    .find({})
    .then((card) => res.send(card))
    .catch(next);
};

module.exports.deleteCard = (req, res, next) => {
  const { cardId } = req.params;
  Card
    .findById(cardId)
    // .populate(['likes', 'owner'])
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка не найдена');
      }
      if (card.owner.toString() !== req.user._id) {
        throw new ForbiddenError('Нельзя удалять чужую карточку!');
      }
      return Card.findByIdAndRemove(cardId)
        .then((obj) => {
          res.status(200).send(obj);
        });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new ValidationError('Введены некорректные данные'));
      }
      return next(err);
    });
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card
    .create({ name, link, owner: req.user._id })
    .then((card) => res.status(201).send(card))
    // .then(() => console.log(req.user._id))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new ValidationError('Введены некорректные данные'));
      }
      return next(err);
    });
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    // .populate(['likes', 'owner'])
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Данные не найдены');
      }
      res.status(200).send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new ValidationError('Введены некорректные данные'));
      }
      return next(err);
    });
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    // .populate(['likes', 'owner'])
    .orFail(() => next(new NotFoundError('Данные не найдены')))
    .then((card) => {
      res.status(200).send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new ValidationError('Введены некорректные данные'));
      }
      return next(err);
    });
};
