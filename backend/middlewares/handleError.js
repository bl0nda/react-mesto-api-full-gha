const handleError = (err, req, res, next) => {
  const { statusCode = 500, message } = err;
  console.error(err);
  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message,
    });
  next();
};

module.exports = handleError;
