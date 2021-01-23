

'use strict';
const loader = require('./sequelize-loader');
const Sequelize = loader.Sequelize;

const Message = loader.database.define(
	  'messages',
	  {
		      messageId : {
			            type: Sequelize.STRING,
			            primaryKey: true,
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
					  },
			  createdAt: {
				type: Sequelize.DATE,
				allowNull: false				  
			  }
		    },
	  {
		      freezeTableName: true,
		      timestamps: false
		    }
);

module.exports = Message;
