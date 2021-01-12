'use strict';
const loader = require('./sequelize-loader');
const Sequelize = loader.Sequelize;

const SecretMessage = loader.database.define(
	  'secret_message',
	  {
            text: {
                    type: Sequelize.STRING,
                    allowNull: false
                    },
            messageKey: {
                    type: Sequelize.STRING,
                    primaryKey: true,
                    allowNull: false
                    },
            show: {
                    type: Sequelize.BOOLEAN,
                    allowNull: false
            }
		    },
	  {
		      freezeTableName: true,
		      timestamps: false
		    }
);

module.exports = SecretMessage;