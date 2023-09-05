'use strict';

const userModel = require('../auth/models/users.js');
const { Sequelize, DataTypes } = require('sequelize');
const restModel = require('./restaurants/restaurants-model.js');
const Collection = require('./collection.js');


const DATABASE_URL = process.env.DATABASE_URL || 'sqlite:memory;';

const sequelize = new Sequelize(DATABASE_URL, { logging: false });

const user = userModel(sequelize, DataTypes);
const restaurant = restModel(sequelize, DataTypes);


const restaurantCollection = new Collection(restaurant);
const userCollection = new Collection(user);



user.hasMany(restaurant, {
  foreignKey: 'ownerId',
  sourceKey: 'id',
});
restaurant.belongsTo(user, {
  foreignKey: 'ownerId',
  targetKey: 'id',
});


module.exports = {
  db: sequelize,
  userCollection: userCollection,
  restaurant: restaurantCollection,
  users: user,
}
