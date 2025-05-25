// models/index.js
// Ajuste o caminho para o seu connection.js, que está dentro de db/
const sequelize = require('../db/connection');
const { DataTypes } = require('sequelize');

// importa o factory do modelo Event
const Event = require('./Event')(sequelize, DataTypes);

module.exports = {
  sequelize,
  Event
};
