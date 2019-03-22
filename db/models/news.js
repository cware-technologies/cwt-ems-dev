'use strict';

module.exports = (sequelize, DataTypes) => {
  const News = sequelize.define('News', {
    category: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [['official', 'notification', 'holiday']],
      }
    },
    body: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: [5, 10000],
      }
    },
  }, {});
  News.associate = function(models) {
    // associations can be defined here
  };
  return News;
};