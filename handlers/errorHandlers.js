exports.catchErrors = fn => {
  return function(req, res, next) {
    return fn(req, res, next).catch(err => {
      const errorDetails = {
        message: err.message,
        status: err.status
      };
      res.status(500).json({ errors: errorDetails });
    });
  };
};
