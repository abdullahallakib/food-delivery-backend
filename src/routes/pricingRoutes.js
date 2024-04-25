const express = require("express");
const router = express.Router();
const db = require("../../database");
const PriceCalculator = require("../services/pricingService");

///////////////////// POST /calculate-price

router.post("/calculate-price", async (req, res) => {
  try {
    console.log(`Request path: http://localhost:3000${req.path}`);
    const { zone, organization_id, total_distance, item_type } = req.body;

    if (!zone || !organization_id || !total_distance || !item_type) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const price = await PriceCalculator.calculatePrice(
      zone,
      organization_id,
      total_distance,
      item_type
    );

    if (isNaN(price)) {
      // Handle invalid price calculation result
      return res.status(500).json({ error: "Invalid price calculation" });
    }

    res.json({ total_price: price });
  } catch (err) {
    if (err.message.includes("No pricing data found")) {
      return res.status(404).json({ error: err.message });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
});

////////////////find a new user

router.get("/findAll", async (req, res) => {
  try {
    console.log(`Request path: http://localhost:3000${req.path}`);
    db.query("SELECT * FROM item", (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }
      console.log("server requested...", result.rows);
      return res.status(200).send(result);
    });
  } catch (error) {
    console.log("erooooor", error);
  }
});

//////////////////// Route to insert pricing data

router.post("/insert-pricing", async (req, res) => {
  try {
    console.log(`Request path: http://localhost:3000${req.path}`);
    const { organization_id, base_distance_in_km, km_price, fix_price, zone } =
      req.body;

    if (
      !organization_id ||
      !base_distance_in_km ||
      !km_price ||
      !fix_price ||
      !zone
    ) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const query = {
      text: `INSERT INTO pricings (organization_id, base_distance_in_km, km_price, fix_price, zone) 
             VALUES ($1, $2, $3, $4, $5)`,
      values: [organization_id, base_distance_in_km, km_price, fix_price, zone],
    };
    await db.query(query);

    res.status(201).json({ message: "Pricing data inserted successfully" });
  } catch (error) {
    console.error("Error inserting pricing data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
