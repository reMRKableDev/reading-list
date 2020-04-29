module.exports = (Sequelize, connector) => {
  const Book = connector.define("book", {
    title: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    author: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });

  return Book;
};
