const Sequelize = require('sequelize');
const db = require('../db');

const Trail = db.define('trail', {
  breadcrumbs: {
    type: Sequelize.ARRAY(Sequelize.JSONB)
  },
  description: {
    type: Sequelize.TEXT
  },
  photoUrl: {
    type: Sequelize.STRING,
    defaultValue: '/assets/defaultTrail.png'
  }
});

module.exports = Trail;
