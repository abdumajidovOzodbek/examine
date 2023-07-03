import User from "./User";
import Product from "./Product";
import sequelize from "../db/connection";

User.hasMany(Product, {
	foreignKey: 'userId',
	onDelete: 'cascade'
})

Product.belongsTo(User, {
  foreignKey: 'userId',
});


sequelize.sync()

export {
	User, 
	Product
}