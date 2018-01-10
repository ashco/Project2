'use strict';
module.exports = (sequelize, DataTypes) => {
  var coin = sequelize.define('coin', {
    ticker: DataTypes.STRING,
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        models.coin.hasMany(models.preference);
      }
    }
  });
  return coin;
};