const router = require('express').Router();
const { User, Trail } = require('../db/models');

module.exports = router;

router.param('id', function (req, res, next, id) {
  Trail.findById(id)
  .then(trail => {
    if (trail) {
      req.trail = trail;
      next();
    } else {
      const error = new Error('Trail does not exist!');
      error.status = 404;
      throw error;
    }
  })
  .catch(next);
});

// GET api/trail
router.get('/', (req, res, next) => {
  Trail.findAll()
  .then(foundTrails => res.json(foundTrails))
  .catch(next);
});

// GET /api/trail/:id
router.get('/:id', function (req, res, next) {
  res.json(req.trail);
});

// POST /api/trail
router.post('/', (req, res, next) => {
  Trail.create({
      where: {
       origin: req.body.origin,
       destination: req.body.destination,
       breadcrumbs: req.body.coords,
       userId: req.body.userId
    }
  })
    .then(createdTrail => {
      res.json(createdTrail);
    })
    .catch(next);
});

// PUT /api/trail/:id
router.put('/:id', function (req, res, next) {
  req.trail.update(req.body)
  .then(trail => res.json(trail))
  .catch(next);
});

// DELETE /api/trail/:id
router.delete('/:id', function (req, res, next) {
  req.trail.destroy()
  .then(() => res.sendStatus(202))
  .catch(next);
});