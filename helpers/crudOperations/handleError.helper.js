module.exports = (res, error) => {
  if (error) {
    console.error(`Error when finding all: ${error}`);

    res.status(500).send({
      message:
        "Sorry! We are currently having server difficulties. Try again later",
    });
  }
};
