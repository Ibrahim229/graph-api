const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

const definition = {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    weight: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
};

async function createTable() {
    const queryInterface = sequelize.getQueryInterface();

    await queryInterface.createTable('weights', definition);

    if ((await queryInterface.showIndex('weights', ['date'])).length == 0) {
        await queryInterface.addIndex('weights', ['date'], { unique: true });
    }
}

createTable();

const Weight = sequelize.define('weight', definition, { timestamps: false });

module.exports = Weight;
