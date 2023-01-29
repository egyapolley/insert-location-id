const Sequelize = require("sequelize");

const sequelize = require("../utils/dbConfig");

const LocationInfo = sequelize.define("locationInfo", {
    msisdn: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false,
    },
    cellId: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false,
    },

});

module.exports =LocationInfo

