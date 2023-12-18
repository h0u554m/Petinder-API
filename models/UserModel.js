const UserModel = (sequilize, Sequilize) => {
  const { INTEGER, TEXT, STRING } = Sequilize;

  const User = sequilize.define("user", {
    ID: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Country: {
      type: STRING,
    },
    "latest-tracked-location": { type: TEXT },
    logbook: { type: TEXT },
  });

  return User;
};

module.exports = UserModel;
