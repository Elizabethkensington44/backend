import express from "express";
const router = express.Router();
export default router;

import {
  createClasses,
  getClassesByClassName,
  getClassesByReservations,
  getClassesByUserId,
} from "#db/queries/classes";
import { createReservations } from "#db/queries/reservations";
import requireUser from "#middleware/requireUser";
import requireBody from "#middleware/requireBody";

router.use(requireUser);

router.get("/", async (req, res) => {
  const classes = await getClassesByClassName(req.user.id);
  res.send(classes);
});

router.post(
  "/",
  requireBody([className, classDescription, classDate, classPrice]),
  async (req, res) => {
    const { className, classDescription, classDate, classPrice } =
      await getClassesByClassName(
        className,
        classDescription,
        classDate,
        classPrice,
        req.user.id,
      );
    res.status(201).send(classes);
  },
);

router.param("id", async (req, res, next, id) => {
  const classes = await getClassesByClassName(id);
  if (!classes) return res.status(404).send("classes not found");

  if (classes.user_id !== req.user.id)
    return res.status(403).send("You do not have access to these classes");

  req.classes = classes;
  next();
});

router.get("/:id/reservations", async (req, res) => {
  const reservations = await getClassesByReservations(req.classes.id);
  res.send(reservations);
});

router.post("/:id/reservations", requireBody(["classId"]), async (req, res) => {
  const { classId } = req.body;
  const class_id = await getClassesByReservations(req.class_id, user_id);
  res.status(201).send(reservations);
});
