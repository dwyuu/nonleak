

'use strict';
const loader = require('./sequelize-loader');
const Sequelize = loader.Sequelize;

const Message = loader.database.define(
	  'messages',
	  {
		      messageId : {
			            type: Sequelize.INTEGER,
			            primaryKey: true,
			            autoIncrement: true,
			            allowNull: false
			          },
		      text: {
			            type: Sequelize.STRING,
			            allowNull: false
			          },
		      speciality: { 
			            type: Sequelize.BOOLEAN,
			            allowNull: false
		     		  },
		      roomId: {
			            type: Sequelize.UUID,
			            allowNull: false
			          },
		      sentBy: {
			            type: Sequelize.STRING,
			            allowNull: false
			          }
		    },
	  {
		      freezeTableName: true,
		      timestamps: false
		    }
);

module.exports = Message;
