require("dotenv").config();

/**
 * @const {Object} process.env                Environment variables
 * @const {string} process.env.DB_HOST        Database host value
 * @const {string} process.env.DB_USER        Database user value
 * @const {string} process.env.DB_PASSWORD    Database password value
 * @const {string} process.env.DB_NAME        Database name value
 * @const {string} process.env.DB_DIALECT     Database dialect value
 */
const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_DIALECT } = process.env;

/**
 * @module db.config.js
 * @type {Object}                             db.config
 * @type {string}                             db.config.host
 * @type {string}                             db.config.user
 * @type {string}                             db.config.password
 * @type {string}                             db.config.name
 * @type {string}                             db.config.dialect
 */
module.exports = {
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  name: DB_NAME,
};
