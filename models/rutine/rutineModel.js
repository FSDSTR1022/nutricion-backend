const mongoose = require("mongoose");
const { Schema } = mongoose;

const RutineSchema = new Schema(
  {
    name: String,
    patient: {
      type: Schema.Types.ObjectId,
      ref: "patient",
    },
    day: Date,
    rounds: [
      {
        order: Number,
        roundName: String,
        exercises: [
          {
            exercise: {
              type: Schema.Types.ObjectId,
              ref: "exercise",
            },
            timeOReps: String,
          },
        ],
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("rutine", RutineSchema);
