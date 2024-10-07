import express from "express";
import studentControllers from "../controllers/student.controllers.js";

const router = express.Router();

router.get("/getAllStudents", studentControllers.getAllStudents);
router.post("/addStudents", studentControllers.addStudents);
router.put("/updateStudentsMarks", studentControllers.updateStudentsMarks);

export default router;
