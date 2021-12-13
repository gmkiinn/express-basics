const parsing = (req, res, next) => {
  console.log('Request Processing');
  next();
};

module.exports = parsing;
