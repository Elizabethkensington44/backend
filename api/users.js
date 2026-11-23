import express from "express";

import { createUser, getUserByUsernameAndPassword } from "#db/queries/users";
import requireBody from "#middleware/requireBody";
import requireUser from "#middleware/requireUser";
import { createToken } from "#utils/jwt";

const router = express.Router();

router
  .route("/register")
  .post(
    requireBody(["username", "password", "fullName", "email"]),
    async (req, res) => {
      const { username, password, fullName, email } = req.body;
      const user = await createUser(username, password, fullName, email);

      const token = createToken({ id: user.id });
      res.status(201).send(token);
    },
  );

router
  .route("/login")
  .post(requireBody(["username", "password"]), async (req, res) => {
    const { username, password } = req.body;
    const user = await getUserByUsernameAndPassword(username, password);
    if (!user) return res.status(401).send("Invalid username or password.");

    const token = createToken({ id: user.id });
    res.send(token);
  });

router.get("/me", requireUser, (req, res) => {
  const { id, username, full_name, email, created_at } = req.user;
  res.send({ id, username, full_name, email, created_at });
});

export default router;
