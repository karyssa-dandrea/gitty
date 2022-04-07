const { Router } = require('express');

module.exports = Router().get('/', (req, res, next) => {
    .then((quotes) => res.send(quotes)).catch((error) => next(error));
})
