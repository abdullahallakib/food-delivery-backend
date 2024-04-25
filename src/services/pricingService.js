
const db = require("../../database");

class PriceCalculator {
  static async calculatePrice(zone, organizationId, totalDistance) {
    try {
    
      const query = `
        SELECT base_distance_in_km, km_price, fix_price 
        FROM Pricings
        WHERE zone = $1 AND organization_id = $2`;
      const values = [zone, organizationId];
      const { rows } = await db.query(query, values);

      

      const { base_distance_in_km, km_price, fix_price } = rows[0];


      let totalPrice = fix_price;
      if (totalDistance > base_distance_in_km) {
        totalPrice += (totalDistance - base_distance_in_km) * km_price;
      }

      return totalPrice * 100; // Convert to cents to avoid decimal issues
    } catch (error) {
      throw new Error('Error calculating price: ' + error.message);
    }
  }
}

module.exports = PriceCalculator;
