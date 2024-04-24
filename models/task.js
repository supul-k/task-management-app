const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/sequalize');

class Task extends Model {}

Task.init(
  {   
    taskName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    taskDescription: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize, 
    modelName: 'Task', 
  },
);