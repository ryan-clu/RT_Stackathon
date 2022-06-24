const express = require("express");
require("dotenv").config(); // extension that loads .env file contents into process.env.
const colors = require('colors'); // requires colors package/library we installed
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");
const connectDB = require('./config/db');

const app = express();

// Connect to database
connectDB();

// Our single Express route
app.use("/graphql", graphqlHTTP({
    schema: schema,
    graphiql: process.env.NODE_ENV === "development",
  })
);

const PORT = process.env.PORT || 8080;

app.listen(PORT, console.log(`(!) Server running on port ${PORT}`.cyan.bold));
