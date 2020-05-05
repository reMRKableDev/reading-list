/**
 * Creates a model for 'reading_lists' table.
 * @function
 * @module book/model
 * @type {Object}       ReadingList
 * @type {Object}       ReadingList.name
 * @type {Object}       ReadingList.type
 *
 * @returns {Object}    ReadingList object representing a database function
 */
module.exports = (Sequelize, connector) => {
  const ReadingList = connector.define("reading_list", {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    type: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });

  return ReadingList;
};
