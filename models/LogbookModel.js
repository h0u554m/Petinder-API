const LogBookModel = (sequilize, Sequilize) => {
  const { INTEGER } = Sequilize;

  const Logbook = sequilize.define("user", {
    total_activity_duration_in_hours: {
      type: INTEGER,
      allowNull: false,
    },
    total_activity_this_month_in_hours: {
      type: INTEGER,
      allowNull: false,
    },
    total_activity_this_week_in_hours: { type: int, allowNull: false },
    total_mins_active_today: { type: int, allowNull: false },
    total_sign_ins_today: { type: int, allowNull: false },
    total_sign_ins_this_week: { type: int, allowNull: false },
    activity_log_in_milliseconds: { type: int, allowNull: false },
  });

  return Logbook;
};

module.exports = LogBookModel;
