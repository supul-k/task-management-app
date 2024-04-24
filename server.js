const express = require('express');
var http = require('http');
const sequalize = require('./config/sequalize');
const pool = require('./config/dbconfig');
const routes = require('./routes/index');

const app = express();

const port = process.env.PORT || 8080;
const hostname = process.env.HOST || localhost;

const forceSync = process.env.FORCE_SYNC === "true";

const checkSequalizeDbConnection = async () => {
  try {
    await sequalize.sync({ force: forceSync});    
    console.log("Database synchronized successfully.");
  } catch (error) {
    console.error("Unable to synchronized the database:", error);
  }
};

const checkDbConnection = async () => {
  try {
    await pool.connect();
    console.log("Database connected successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

app.use('/', routes);

const startServer = async () => {
  await checkSequalizeDbConnection();
  await checkDbConnection();

  app.listen(port, () => {
    console.log(`Server running on http://${hostname}:${port}/`);
  });
};

startServer();
