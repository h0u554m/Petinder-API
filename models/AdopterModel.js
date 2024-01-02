const AdopterModel = (sequilize, Sequilize) => {
  const { INTEGER, TEXT, STRING } = Sequilize;

  const Adopter = sequilize.define("user", {
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
    first_name: { type: STRING, allowNull: false },
    last_name: { type: STRING, allowNull: false },
    number_of_pets: { type: INTEGER, allowNull: false },
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
    profile_picture: { type: STRING },
    what_type_of_animal_do_you_like: { type: STRING },
    activity_profile: { type: STRING },
  });

  return Adopter;
};

module.exports = AdopterModel;
