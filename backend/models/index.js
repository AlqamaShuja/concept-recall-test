const { Sequelize } = require('sequelize');
const config = require('../db/config');

const sequelize = new Sequelize(
    config.development.database,
    config.development.username,
    config.development.password,
    {
      host: config.development.host,
      port: config.development.port,
      dialect: config.development.dialect,
      logging: false, 
    },
);

// Import Models
const User = require('./User')(sequelize);
const Post = require('./Post')(sequelize);
const Follower = require('./Follower')(sequelize);

// Define Relationships
User.hasMany(Post, { foreignKey: 'userId' });
Post.belongsTo(User, { foreignKey: 'userId' });

User.belongsToMany(User, { as: 'Followers', through: Follower, foreignKey: 'followingId' });
User.belongsToMany(User, { as: 'Followings', through: Follower, foreignKey: 'followerId' });


module.exports = { sequelize, User, Post, Follower };
