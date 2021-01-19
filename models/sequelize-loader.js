
'use strict';
const Sequelize = require('sequelize');
console.log("-----------------------------------")
console.log(process.env.DATABASE_URL)
console.log("------------------------------------------------")
console.log(process.env)
console.log("---------------------------------------")
const sequelize = new Sequelize(
	 process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost/nonleak'
);

try {
	await sequelize.authenticate();
	console.log('Connection has been established successfully.');
  } catch (error) {
	console.error('Unable to connect to the database:', error);
  }

module.exports = {
	  database: sequelize,
	  Sequelize: Sequelize
};
