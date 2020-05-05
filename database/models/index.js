/**
 * @const Sequelize                       Sequelize ORM dependency
 */
const Sequelize = require("sequelize");

/**
 * @const {Object} db.config              Object containing database configurations
 * @const {string} db.config.host         Database host value
 * @const {string} db.config.user         Database user value
 * @const {string} db.config.password     Database password value
 * @const {string} db.config.name         Database name value
 * @const {string} db.config.dialect      Database dialect value
 */
const { host, user, password, name, dialect } = require("../configs/db.config");

/**
 * Connects to the database by creating a Sequelize instance.
 * @instance
 * @requires module:sequelize
 *
 * @param {string}        name
 * @param {string}        user
 * @param {string}        password
 * @param {object.string} options.host
 * @param {object.string} options.dialect
 *
 */
const connector = new Sequelize(name, user, password, {
  host,
  dialect,
});

/**
 * Authenticate the database connection
 * @return {Promise}
 */
connector
  .authenticate()
  .then(() => console.log(`Connection to database is successful`))
  .catch((err) =>
    console.error(`Connection to database was unsuccessful: ${err}`)
  );

/**
 * Initiates a database object with the connector, models, and associations.
 * @const db                               Database object
 * @type {Sequelize.constructor}           db.Sequelize
 * @type {Sequelize.instance}              db.connector
 * @type {Sequelize.model}                 db.readingList
 * @type {Sequelize.model}                 db.book
 *
 */
const db = {};

db.Sequelize = Sequelize;
db.connector = connector;
db.readingList = require("./readingList.model")(Sequelize, connector);
db.book = require("./book.model")(Sequelize, connector);

db.book.belongsTo(db.readingList);

/**
 * @module database/object
 */
module.exports = db;
