const mongoose = require('mongoose');
const { Schema } = mongoose;

const exerciseSchema = new Schema(
  {
    name: String,
    exerciseType: {
      type: Schema.Types.ObjectId,
      ref: "exercisetypes",
    },
    bodyParts: [{
      type: Schema.Types.ObjectId,
      ref: "exercisebodypart",
    }],
    muscles: [{
      type: Schema.Types.ObjectId,
      ref: "exercisemuscles",
    }],
    difficulty: 
      {
        type: Schema.Types.ObjectId,
        ref: "exercisedifficulty",
      },
    equipments: [{
      type: Schema.Types.ObjectId,
      ref: "exerciseequipment",
    }],
    explanation: String,
    precautions: String,
    photo: String,
    video: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("exercise", exerciseSchema);
