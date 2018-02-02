const router = require('express').Router();
const { User, Trail } = require('../db/models');

module.exports = router;

router.get('/', (req, res, next) => {
  Trail.findAll()
  .then(foundTrails => {
    res.json(foundTrails);
  })
  .catch(next);
});

router.post('/', (req, res, next) => {
  Trail.create(req.body)
    .then(createdTrail => {
      res.json(createdTrail);
    })
    .catch(next);
});
