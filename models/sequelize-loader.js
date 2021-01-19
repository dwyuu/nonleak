
'use strict';
const Sequelize = require('sequelize');
console.log("-----------------------------------")
console.log(process.env.DATABASE_URL)
console.log("------------------------------------------------")
const sequelize = new Sequelize(
	 process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost/nonleak'
);


module.exports = {
	  database: sequelize,
	  Sequelize: Sequelize
};
