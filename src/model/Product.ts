import { DataTypes, Model } from 'sequelize';
import sequelize from '../db/connection';

class Product extends Model {
  public productId!: number;
  public title!: string;
  public price!: number;
}


Product.init(
  {
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING(32),
      allowNull: false,
      validate: {
        isLowercase: true,
        len: [2, 32],
      },
    },
    price: DataTypes.SMALLINT,
  },
  {
    tableName: 'products',
    sequelize,
    paranoid: true,
  },
);


export default Product;