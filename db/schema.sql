DROP TABLE IF EXISTS reservations, classes, teachers, users;

CREATE TABLE users (
  id serial PRIMARY KEY,
  username text NOT NULL UNIQUE,
  password text NOT NULL
);

CREATE TABLE teachers (
  id serial PRIMARY KEY,
  teacher_name text NOT NULL,
  dance_style text NOT NULL,
  bio text NOT NULL
);

CREATE TABLE classes (
  id serial PRIMARY KEY,
  class_name text NOT NULL,
  class_teacher text NOT NULL,
  class_description text NOT NULL,
  class_date date NOT NULL,
  class_price integer NOT NULL
);

CREATE TABLE reservations (
  id serial PRIMARY KEY,
class_id integer NOT NULL REFERENCES classes(id) ON DELETE CASCADE
);