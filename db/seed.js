import { createClass } from "#db/queries/classes";
import { createTeacher } from "#db/queries/teachers";
import { createUser } from "#db/queries/users";

/** Inserts sample users, teachers, and classes. */
export async function seed() {
  await seedUsers();
  await seedTeachers();
  await seedClasses();
}

async function seedUsers() {
  for (let i = 0; i < 15; i++) {
    await createUser(`user${i}`, "password123");
  }
}

async function seedTeachers() {
  for (let i = 0; i < 10; i++) {
    await createTeacher(`Teacher ${i}`, "Contemporary", "Bio coming soon.");
  }
}

async function seedClasses() {
  for (let i = 0; i < 20; i++) {
    await createClass(
      `Class ${i}`,
      `Teacher ${i % 10}`,
      "Description coming soon.",
      "2026-11-11",
      (i + 1) * 5,
    );
  }
}
