import db from "#db/client";

export async function createReservations(user_id, class_id) {
  const sql = `
    INSERT INTO reservations
    (user_id, class_id)
    VALUES
    ($1, $2)
    RETURNING *
    `;
  const {
    rows: [reservations],
  } = await db.query(sql, [user_id, class_id]);
  return reservations;
}
