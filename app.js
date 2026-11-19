import cors from "cors";
import express from "express";
import morgan from "morgan";

import classesRouter from "#api/classes";
import reservationsRouter from "#api/reservations";
import teachersRouter from "#api/teachers";
import usersRouter from "#api/users";
import getUserFromToken from "#middleware/getUserFromToken";
import handlePostgresErrors from "#middleware/handlePostgresErrors";

const app = express();

app.use(cors({ origin: process.env.CORS_ORIGIN ?? /localhost/ }));
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(getUserFromToken);

app.get("/", (req, res) => res.send("Dance Studio API"));

app.use("/users", usersRouter);
app.use("/classes", classesRouter);
app.use("/teachers", teachersRouter);
app.use("/reservations", reservationsRouter);

app.use(handlePostgresErrors);
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Sorry! Something went wrong.");
});

export default app;
