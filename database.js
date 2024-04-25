// database.js
// const { Sequelize } = require("sequelize");

// const sequelize = new Sequelize({
//   dialect: "postgres",
//   host: "localhost",
//   port: 5432,
//   username: "postgres",
//   password: "123456",
//   database: "food",
// });

// sequelize
//   .authenticate()
//   .then(() => {
//     console.log("Connection has been established successfully.");
//   })
//   .catch((error) => {
//     console.error("Unable to connect to the database:", error);
//   });

// module.exports = sequelize;


const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "food",
  password: "123456",
  port: 5432, // Specify the port directly here
});

pool
  .query("SELECT NOW()")
  .then((res) => {
    console.log("Connection to database successful");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback);
  },
};