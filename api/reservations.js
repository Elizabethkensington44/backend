import express from "express";

import {
  deleteReservation,
  getReservationsByUserId,
} from "#db/queries/reservations";
import requireUser from "#middleware/requireUser";

const router = express.Router();

router.use(requireUser);

router.get("/", async (req, res) => {
  const reservations = await getReservationsByUserId(req.user.id);
  res.send(reservations);
});

router.delete("/:id", async (req, res) => {
  const deleted = await deleteReservation(req.params.id, req.user.id);
  if (!deleted) return res.status(404).send("Reservation not found");

  res.send(deleted);
});

export default router;
