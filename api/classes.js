import express from "express";

import { getClassById, getClasses } from "#db/queries/classes";
import {
  createReservation,
  getReservationsByClassId,
} from "#db/queries/reservations";
import requireUser from "#middleware/requireUser";

const router = express.Router();

router.get("/", async (req, res) => {
  const classes = await getClasses();
  res.send(classes);
});

router.get("/:id", async (req, res) => {
  const foundClass = await getClassById(req.params.id);
  if (!foundClass) return res.status(404).send("Class not found");

  res.send(foundClass);
});

router.get("/:id/reservations", requireUser, async (req, res) => {
  const reservations = await getReservationsByClassId(req.params.id);
  res.send(reservations);
});

router.post("/:id/reservations", requireUser, async (req, res) => {
  const reservation = await createReservation(req.user.id, req.params.id);
  res.status(201).send(reservation);
});

export default router;
