/**
 * Creates a model for 'books' table.
 * @function
 * @module book/model
 * @type {Object}       Book
 * @type {Object}       Book.title
 * @type {Object}       Book.author
 * @returns {Object}    Book object representing a database function
 */
module.exports = (Sequelize, connector) => {
  const Book = connector.define("book", {
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    author: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });

  return Book;
};
