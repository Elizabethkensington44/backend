import db from "#db/client";

export async function createTeachers(teacherName, danceStyle, bio) {
  const sql = `
    INSERT INTO teachers
    ( teacherNamre, danceStyle, bio)
     VALUES
     ($1, $2, $3)
     RETURNING *
    `;
  const {
    rows: [teachers],
  } = await db.query(sql, [teacherName, danceStyle, bio]);
  return teachers;
}
