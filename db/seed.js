import db from "#db/client";
import { createUser } from "#db/queries/users";

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

/*async function seed() {
  await createUser("foo", "bar");
}*/

async function seedUsers() {
  for (let i = 0; i < 15; i++) {
    const users = {
      userName: "name" + i,
      password: "hashedPassword",
    };
    await createUser(users);
  }
}

async function seedTeachers() {
  for (let i = 0; i < 10; i++) {
    const teachers = {
      teacherName: "name" + 1,
      danceStyle: "description",
      bio: "description",
    };
    await createTeachers(teachers);
  }
}

async function seedClasses() {
  for (let i = 0; i < 20; i++) {
    const classes = {
      className: "name" + i,
      classDescription: "description",
      classDate: "2026-11-11",
      classPrice: Math.floor(Math.random()),
    };
    await createClasses(classes);
  }
}
