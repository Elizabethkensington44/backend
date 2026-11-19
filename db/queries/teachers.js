import db from "#db/client";

export async function createTeacher(teacherName, danceStyle, bio) {
  const sql = `
    INSERT INTO teachers
      (teacher_name, dance_style, bio)
    VALUES
      ($1, $2, $3)
    RETURNING *
  `;
  const {
    rows: [teacher],
  } = await db.query(sql, [teacherName, danceStyle, bio]);
  return teacher;
}

export async function getTeachers() {
  const sql = `
    SELECT *
    FROM teachers
    ORDER BY teacher_name
  `;
  const { rows: teachers } = await db.query(sql);
  return teachers;
}

export async function getTeacherById(id) {
  const sql = `
    SELECT *
    FROM teachers
    WHERE id = $1
  `;
  const {
    rows: [teacher],
  } = await db.query(sql, [id]);
  return teacher;
}
