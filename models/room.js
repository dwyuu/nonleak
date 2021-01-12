

'use strict';
const loader = require('./sequelize-loader');
const Sequelize = loader.Sequelize;

const Room = loader.database.define(
	  'room',
	  {
		      roomId: {
			            type: Sequelize.UUID,
			            primaryKey: true,
			            allowNull: false
			          },
		      roomName: {
			            type: Sequelize.STRING,
			            allowNull: false
			          },
		      roomKey: {
			            type: Sequelize.STRING,
			            primaryKey: true,
			            allowNull: false
			          },
		      createdBy: {
			            type: Sequelize.STRING,
			            allowNull: false
			          },
		      capacity: {
			            type: Sequelize.INTEGER,
			            allowNull: false
			          },
		      expiration :{
			            type:Sequelize.INTEGER,
			            allowNull: false
					  },
			  peopleInside :{
			            type:Sequelize.INTEGER,
			            allowNull: false
					  }
		    },
	  {
		      freezeTableName: true,
		      timestamps: false,
		      indexes: [
			            {
					            fields: ['roomId']
					          }
			          ]
		    }
);

module.exports = Room;
