import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  classes: {
    type: Number,
    required: true,
  },
  stream: {
    type: String,
    required: true,
  },
  subjects: [
    {
      subjectName: {
        type: String,
        required: true,
      },
      marks: {
        type: Number,
        required: true,
      },
    },
  ],
});

const Student = mongoose.model("Student", studentSchema);

export default Student;
