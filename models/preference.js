'use strict';
module.exports = (sequelize, DataTypes) => {
  var preference = sequelize.define('preference', {
    userId: DataTypes.INTEGER,
    coinId: DataTypes.INTEGER,
    watchlist: DataTypes.INTEGER,
    value: DataTypes.INTEGER,
    holding: DataTypes.NUMERIC
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        models.preference.belongsTo(models.coin);
        models.preference.belongsTo(models.user);
      }
    }
  });
  return preference;
};