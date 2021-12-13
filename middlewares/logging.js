const logging = (req, res, next) => {
  console.log('Logging the requests');
  next();
};

module.exports = logging;
