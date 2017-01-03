'use strict';

module.export = {

  logErrors: (err, req, res, next) => {
    console.error(err.stack);
    next(err);
  },

  clientSideErrorHandler: (err, req, res, next) => {
    if (req.xhr) {
      res.status(500).send({ error: 'Something failed on the client!' });
    } else {
      next(err);
    }
  },

  errorHandler: (err, req, res, next) => {
    res.status(500);
    res.render('error', { error: err });
  },

  httpsRedirect: (req, res, next) => {
    if (process.env.NODE_ENV === 'production') {
      if (req.headers['x-forwarded-proto'] !== 'https') {
        return res.redirect('https://' + req.headers.host + req.url);
      } else {
        return next();
      }
    } else {
      return next();
    }
  }
}
