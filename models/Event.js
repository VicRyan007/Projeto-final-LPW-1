// models/event.js
module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define('Event', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    // para Cultura, Leilão e Workshop
    date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    // para Shows e, se quiser, para precisão de horário
    time: {
      type: DataTypes.TIME,
      allowNull: true
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    type: {
      type: DataTypes.ENUM('cultura', 'leilao', 'show', 'workshop'),
      allowNull: false
    }
  }, {
    tableName: 'events',
    timestamps: false,
    scopes: {
      cultura:  { where: { type: 'cultura' } },
      leilao:   { where: { type: 'leilao'   } },
      show:     { where: { type: 'show'     } },
      workshop: { where: { type: 'workshop' } }
    }
  });

  return Event;
};
