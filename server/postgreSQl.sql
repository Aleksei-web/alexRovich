create TABLE worker (
	id SERIAL PRIMARY KEY,
	name VARCHAR(225)
);


create TABLE post (
	id SERIAL PRIMARY KEY,
	title VARCHAR(225),
	content VARCHAR(225),
	user_id INTEGER,
	FOREIGN KEY (user_id) REFERENCES person (id)
);


create TABLE reason_list (
  id SERIAL PRIMARY KEY,
  title VARCHAR(225)
);

create TABLE feedback (
	id SERIAL PRIMARY KEY,
	comment VARCHAR(225),
	rating SMALLINT,
	reasons_id INTEGER,
	FOREIGN KEY (reasons_id) REFERENCES reason_list (id),
	id_worker INTEGER,
	FOREIGN KEY (id_worker) REFERENCES worker (id),
	ts timestamp without time zone default current_timestamp
);

create TABLE users (
	id SERIAL PRIMARY KEY,
	user_name VARCHAR(225),
	password VARCHAR(225)
);


CREATE TABLE "session" (
  "sid" varchar NOT NULL COLLATE "default",
  "sess" json NOT NULL,
  "expire" timestamp(6) NOT NULL
)
WITH (OIDS=FALSE);


ALTER TABLE "session" ADD CONSTRAINT "session_pkey"
PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;



// psql \! chcp 1251 //
// select * from person; // получить всех пользователей