const { DataTypes } = require('sequelize');
const sequelize = require('../../database');

const Pricings = sequelize.define('Pricings', {
  // Define model attributes
  organization_id: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  base_distance_in_km: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  km_price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  fix_price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  zone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Export the Pricing model
module.exports = Pricings;
