'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsTo(models.Section, {
        as : 'section',
        foreignKey : 'sectionId'
      });

      Product.belongsTo(models.Category,{
        as : 'category',
        foreignKey : 'categoryId'
      });

      Product.hasMany(models.Image, {
        as : 'images',
        foreignKey : 'productId',
        onDelete : 'cascade'
      });
    }
  }
  Product.init({
    title: {
      type : DataTypes.STRING,
      allowNull : false
    },
    price: DataTypes.INTEGER,
    discount: DataTypes.INTEGER,
    description: DataTypes.TEXT,
    categoryId: DataTypes.INTEGER,
    sectionId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product',
    paranoid: true
  });
  return Product;
};