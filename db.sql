-- creating schema table for reminders
CREATE TABLE reminders (
  "_id" serial primary key,
  "text" varchar,
  "created_at" timestamp default current_timestamp 
);