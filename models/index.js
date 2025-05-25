
const sequelize = require('../db/connection');
const { DataTypes } = require('sequelize');


const Event = require('./Event')(sequelize, DataTypes);

module.exports = {
  sequelize,
  Event
};
