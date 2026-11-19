import express from "express";

import { getTeacherById, getTeachers } from "#db/queries/teachers";

const router = express.Router();

router.get("/", async (req, res) => {
  const teachers = await getTeachers();
  res.send(teachers);
});

router.get("/:id", async (req, res) => {
  const teacher = await getTeacherById(req.params.id);
  if (!teacher) return res.status(404).send("Teacher not found");

  res.send(teacher);
});

export default router;
