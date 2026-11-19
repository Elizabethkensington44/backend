import db from "#db/client";

export async function createReservation(userId, classId) {
  const sql = `
    INSERT INTO reservations
      (user_id, class_id)
    VALUES
      ($1, $2)
    RETURNING *
  `;
  const {
    rows: [reservation],
  } = await db.query(sql, [userId, classId]);
  return reservation;
}

export async function deleteReservation(id, userId) {
  const sql = `
    DELETE FROM reservations
    WHERE id = $1 AND user_id = $2
    RETURNING *
  `;
  const {
    rows: [deleted],
  } = await db.query(sql, [id, userId]);
  return deleted;
}

export async function getReservationsByUserId(userId) {
  const sql = `
    SELECT reservations.*, classes.class_name, classes.class_date
    FROM reservations
    JOIN classes ON classes.id = reservations.class_id
    WHERE reservations.user_id = $1
    ORDER BY classes.class_date, classes.id
  `;
  const { rows: reservations } = await db.query(sql, [userId]);
  return reservations;
}

export async function getReservationsByClassId(classId) {
  const sql = `
    SELECT reservations.*, users.username
    FROM reservations
    JOIN users ON users.id = reservations.user_id
    WHERE reservations.class_id = $1
    ORDER BY reservations.id
  `;
  const { rows: reservations } = await db.query(sql, [classId]);
  return reservations;
}
