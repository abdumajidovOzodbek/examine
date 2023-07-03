import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
	username: 'postgres',
	host: 'localhost',
	password: '111133',
	database: 'lesson34',
	logging: false,
	dialect: 'postgres'
})

!async function () {
	try {
		await sequelize.authenticate()
		console.log('db connection');
	} catch (error) {
		console.log('db error: ', error);
	}
}()

export default sequelize;