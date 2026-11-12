import db from "#db/client";

export async function createClasses(
  className,
  classDescription,
  classDate,
  classPrice,
) {
  const sql = `
    INSERT INTO classes
    (className, classDescription, classDate, classPrice)
    VALUES
    ($1, $2, $3, $4)
    RETURNING *
    `;
  const {
    rows: [classes],
  } = await db.query(sql, [className, classDescription, classDate, classPrice]);
  return classes;
}

export async function getClassesByUserId(id) {
  const sql = `
    SELECT *
    FROM classes
    WHERE user_id =$1
    `;
  const { rows: classes } = await db.query(sql[id]);
  return classes;
}

export async function getClassesByClassName(className) {
  const sql = `
    SELECT classes.*
    FROM classes
    WHERE className = $1
    `;
  const {
    rows: [classes],
  } = await db.query(sql, [className]);
}
