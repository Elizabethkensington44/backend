import db from "#db/client";

/** Bring an older `users` table up to the current schema without losing data. */
const sql = `
  ALTER TABLE users
    ADD COLUMN IF NOT EXISTS full_name text,
    ADD COLUMN IF NOT EXISTS email text,
    ADD COLUMN IF NOT EXISTS created_at timestamptz NOT NULL DEFAULT now();

  UPDATE users SET full_name = username WHERE full_name IS NULL;
  UPDATE users SET email = 'user-' || id || '@example.invalid' WHERE email IS NULL;

  ALTER TABLE users
    ALTER COLUMN full_name SET NOT NULL,
    ALTER COLUMN email SET NOT NULL;

  DO $$
  BEGIN
    IF NOT EXISTS (
      SELECT 1 FROM pg_constraint
      WHERE conname = 'users_email_key' AND conrelid = 'users'::regclass
    ) THEN
      ALTER TABLE users ADD CONSTRAINT users_email_key UNIQUE (email);
    END IF;
  END $$;
`;

await db.connect();

try {
  await db.query(sql);
  console.log("✓ users table updated.");
} finally {
  await db.end();
}
