import Student from "../models/student.model.js";

const addStudents = async (req, res) => {
  const { name, classes, stream, subjects } = req.body; // Use req.body for POST data

  try {
    // Create a new student instance
    const newStudent = new Student({
      name,
      classes,
      stream,
      subjects,
    });

    // Save the student to the database
    await newStudent.save();

    // Send a success response
    res.status(201).json({ message: "Student added successfully" });
  } catch (error) {
    console.error(error, "Backend error in adding student");
    res.status(500).json({
      message: "Error adding student",
      error: error.message,
    });
  }
};

const getAllStudents = async (req, res) => {
  const { classes, stream, subject } = req.query;

  try {
    const data = await Student.find({
      classes,
      stream,
      "subjects.subjectName": subject,
    });
    if (res) res.status(200).json({ data });
    else res.status(200).json({ data: [] });
  } catch (error) {
    console.log(error, "Backend Error in fetching all students");
  }
};

const updateStudentsMarks = async (req, res) => {
  const { subjectName, studentMarks } = req.body;

  try {
    // Validate the input
    if (!subjectName || typeof subjectName !== "string") {
      return res
        .status(400)
        .json({ message: "Subject name must be provided." });
    }

    if (!Array.isArray(studentMarks) || studentMarks.length === 0) {
      return res
        .status(400)
        .json({ message: "Student marks data must be provided in an array." });
    }

    const updatePromises = studentMarks.map(async ({ name, marks }) => {
      return Student.updateOne(
        { name, "subjects.subjectName": subjectName },
        { $set: { "subjects.$.marks": marks } } // Update the marks for the fixed subject
      );
    });

    // Execute all update operations concurrently
    const updateResults = await Promise.all(updatePromises);

    // Count how many students were updated
    const numberOfUpdatedStudents = updateResults.reduce(
      (count, result) => count + result.nModified,
      0
    );

    if (numberOfUpdatedStudents === 0) {
      return res.status(404).json({ message: "No students were updated." });
    }

    res.status(200).json({
      message: `student(s) updated successfully.`,
    });
  } catch (error) {
    console.log(error, "Backend error in updating students marks");
  }
};

export default { getAllStudents, addStudents, updateStudentsMarks };
