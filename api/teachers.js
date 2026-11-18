import express from "express";
const router = express.Router();
export default router;

import { createTeachers } from "#db/queries/teachers";

router.use(requireuser);

router.get("/", async (req, res) => {
  const teachers = await getTeachers(req.user.id);
  res.send(teachers);
});
