const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('Follower', {
    followerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    followingId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
};
