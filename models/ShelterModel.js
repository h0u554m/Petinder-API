const ShelterModel = (sequilize, Sequilize) => {
  const { INTEGER, TEXT, STRING } = Sequilize;

  const User = sequilize.define("user", {
    ID: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Country: {
      type: STRING,
      allowNull: false,
    },
    latest_tracked_location: {
      type: TEXT,
      allowNull: false,
      get() {
        return JSON.parse(this.getDataValue("latest_tracked_location"));
      },
      set(val) {
        this.setDataValue("latest_tracked_location", JSON.stringify(val));
      },
    },
    logbook: { type: STRING },
    name: { type: STRING, allowNull: false },
    profile_picture: { type: STRING, allowNull: false },
    pets: {
      type: STRING,
      allowNull: false,
      get() {
        return this.getDataValue("pets").split(";");
      },
      set(val) {
        this.setDataValue("pets", val.join(";"));
      },
    },
    address: { type: STRING, allowNull: false },
  });

  return User;
};

module.exports = ShelterModel;
