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
