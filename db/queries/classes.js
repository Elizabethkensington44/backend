import db from "#db/client";

export async function createClass(
  className,
  classTeacher,
  classDescription,
  classDate,
  classPrice,
) {
  const sql = `
    INSERT INTO classes
      (class_name, class_teacher, class_description, class_date, class_price)
    VALUES
      ($1, $2, $3, $4, $5)
    RETURNING *
  `;
  const {
    rows: [createdClass],
  } = await db.query(sql, [
    className,
    classTeacher,
    classDescription,
    classDate,
    classPrice,
  ]);
  return createdClass;
}

export async function getClasses() {
  const sql = `
    SELECT *
    FROM classes
    ORDER BY class_date, id
  `;
  const { rows: classes } = await db.query(sql);
  return classes;
}

export async function getClassById(id) {
  const sql = `
    SELECT *
    FROM classes
    WHERE id = $1
  `;
  const {
    rows: [foundClass],
  } = await db.query(sql, [id]);
  return foundClass;
}
