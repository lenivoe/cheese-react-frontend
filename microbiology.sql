DROP SCHEMA public CASCADE;
CREATE SCHEMA public;

CREATE SEQUENCE IF NOT EXISTS FormalParameterGroupIdSequence
INCREMENT 1
START 1;

CREATE SEQUENCE IF NOT EXISTS FactParameterGroupIdSequence
INCREMENT 1
START 1;

-- Adminer 4.8.1 PostgreSQL 13.3 (Debian 13.3-1.pgdg100+1) dump

CREATE TABLE "public"."action_type" (
    "role_id" bigint NOT NULL,
    "actions" character varying(255)
) WITH (oids = false);


CREATE SEQUENCE fact_parameter_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 9223372036854775807 CACHE 1;

CREATE TABLE "public"."fact_parameter" (
    "id" bigint NOT NULL,
    "group_id" bigint,
    "reserve" character varying(255),
    "value" character varying(255),
    "formal_parameter_id" bigint NOT NULL,
    "strain_id" bigint NOT NULL,
    CONSTRAINT "fact_parameter_pkey" PRIMARY KEY ("id")
) WITH (oids = false);

INSERT INTO "fact_parameter" ("id", "group_id", "reserve", "value", "formal_parameter_id", "strain_id") VALUES
(1,	1,	NULL,	'15',	1,	1),
(3,	1,	NULL,	'5',	4,	1),
(5,	2,	NULL,	'12',	1,	1),
(6,	2,	NULL,	'6',	4,	1),
(4,	3,	NULL,	'мягкий',	2,	1);

CREATE SEQUENCE formal_parameter_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 9223372036854775807 CACHE 1;

CREATE TABLE "public"."formal_parameter" (
    "id" bigint NOT NULL,
    "group_id" bigint,
    "name" character varying(255) NOT NULL,
    "parameter_data_type_id" bigint NOT NULL,
    "property_id" bigint NOT NULL,
    CONSTRAINT "formal_parameter_pkey" PRIMARY KEY ("id")
) WITH (oids = false);

INSERT INTO "formal_parameter" ("id", "group_id", "name", "parameter_data_type_id", "property_id") VALUES
(1,	1,	'продолжительность, ч',	2,	1),
(4,	1,	'инокулюм, %',	2,	1),
(2,	2,	'значение',	6,	2),
(3,	3,	'кислотность, ºТ',	2,	3),
(5,	3,	'продолжительность',	3,	3);

CREATE SEQUENCE parameter_data_type_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 9223372036854775807 CACHE 1;

CREATE TABLE "public"."parameter_data_type" (
    "id" bigint NOT NULL,
    "name" character varying(255) NOT NULL,
    CONSTRAINT "parameter_data_type_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "uk_8kus8dliuh6irwgu1nkvrlg1j" UNIQUE ("name")
) WITH (oids = false);

INSERT INTO "parameter_data_type" ("id", "name") VALUES
(1,	'String'),
(2,	'Number'),
(3,	'Time'),
(4,	'Boolean'),
(5,	'Date'),
(6,	'Item');

CREATE SEQUENCE property_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 9223372036854775807 CACHE 1;

CREATE TABLE "public"."property" (
    "id" bigint NOT NULL,
    "code" character varying(255),
    "is_note" boolean NOT NULL,
    "name" character varying(255) NOT NULL,
    CONSTRAINT "property_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "uk_17f03s5ron7wrua25qyg8tx2v" UNIQUE ("code"),
    CONSTRAINT "uk_hgo2avysvdf8312u6ivgyc1lp" UNIQUE ("name")
) WITH (oids = false);

INSERT INTO "property" ("id", "code", "is_note", "name") VALUES
(2,	'2',	'1',	'Характер сгустка'),
(1,	'1',	'1',	'Продолжительность свертывания молока'),
(3,	'3',	'1',	'Кислотообразование в молоке');

CREATE SEQUENCE role_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 9223372036854775807 CACHE 1;

CREATE TABLE "public"."role" (
    "id" bigint NOT NULL,
    "name" character varying(255),
    CONSTRAINT "role_pkey" PRIMARY KEY ("id")
) WITH (oids = false);


CREATE SEQUENCE set_of_values_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 9223372036854775807 CACHE 1;

CREATE TABLE "public"."set_of_values" (
    "id" bigint NOT NULL,
    "value" character varying(255) NOT NULL,
    "formal_parameter_id" bigint NOT NULL,
    CONSTRAINT "set_of_values_pkey" PRIMARY KEY ("id")
) WITH (oids = false);

INSERT INTO "set_of_values" ("id", "value", "formal_parameter_id") VALUES
(1,	'ровный',	2),
(2,	'сметанообразный',	2);

CREATE SEQUENCE strain_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 9223372036854775807 CACHE 1;

CREATE TABLE "public"."strain" (
    "id" bigint NOT NULL,
    "collection_index" character varying(255) NOT NULL,
    "creator" character varying(255),
    "date_added" date NOT NULL,
    "date_receiving" date NOT NULL,
    "name" character varying(255) NOT NULL,
    "obtaining_method" character varying(255) NOT NULL,
    "source" character varying(255) NOT NULL,
    "type_id" bigint NOT NULL,
    CONSTRAINT "strain_pkey" PRIMARY KEY ("id")
) WITH (oids = false);

INSERT INTO "strain" ("id", "collection_index", "creator", "date_added", "date_receiving", "name", "obtaining_method", "source", "type_id") VALUES
(1,	'СКМ-766',	'2',	'2021-04-15',	'2021-04-15',	'22ХВ',	'Смыв с груши',	'Пермская лаборатория №3',	5),
(2,	'СКМ-732',	'22',	'2021-04-15',	'2021-04-15',	'41УС',	'Выведен из молока',	'Лаборатория',	5),
(3,	'СКМ-701',	'22',	'2021-04-15',	'2021-04-15',	'41УС-Б',	'Мутант штамма 41УС',	'Лаборатория',	5);

CREATE SEQUENCE strain_genus_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 9223372036854775807 CACHE 1;

CREATE TABLE "public"."strain_genus" (
    "id" bigint NOT NULL,
    "name" character varying(255) NOT NULL,
    CONSTRAINT "strain_genus_pkey" PRIMARY KEY ("id")
) WITH (oids = false);

INSERT INTO "strain_genus" ("id", "name") VALUES
(1,	'Leuconostoc'),
(2,	'Lactococcus'),
(3,	'Lactobacillus'),
(4,	'Streptococcus');

CREATE SEQUENCE strain_type_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 9223372036854775807 CACHE 1;

CREATE TABLE "public"."strain_type" (
    "id" bigint NOT NULL,
    "name" character varying(255) NOT NULL,
    "genus_id" bigint NOT NULL,
    CONSTRAINT "strain_type_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "uk_pg5rpypsfu4y943per0faf1mt" UNIQUE ("name")
) WITH (oids = false);

INSERT INTO "strain_type" ("id", "name", "genus_id") VALUES
(2,	'Lactococcus lactis',	2),
(4,	'Streptococcus thermophilus',	4),
(5,	'Lactococcus cremoris',	2),
(1,	'Lactococcus lactis sp.diacetylactis',	2),
(3,	'Lactobacillus longum',	3);

CREATE SEQUENCE system_user_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 9223372036854775807 CACHE 1;

CREATE TABLE "public"."system_user" (
    "id" bigint NOT NULL,
    "enabled" boolean NOT NULL,
    "name" character varying(255),
    "password" character varying(255),
    "role_id" bigint,
    CONSTRAINT "system_user_pkey" PRIMARY KEY ("id")
) WITH (oids = false);


ALTER TABLE ONLY "public"."action_type" ADD CONSTRAINT "fkpj4la4oesx8h27l9mtjl8fpjr" FOREIGN KEY (role_id) REFERENCES role(id) NOT DEFERRABLE;

ALTER TABLE ONLY "public"."fact_parameter" ADD CONSTRAINT "fkd0otpflaw96oubup8to7e9n4o" FOREIGN KEY (strain_id) REFERENCES strain(id) NOT DEFERRABLE;
ALTER TABLE ONLY "public"."fact_parameter" ADD CONSTRAINT "fkgoxraxdwqg0k7fw9jtdt9o3nc" FOREIGN KEY (formal_parameter_id) REFERENCES formal_parameter(id) NOT DEFERRABLE;

ALTER TABLE ONLY "public"."formal_parameter" ADD CONSTRAINT "fklfd6eb21x25axp7ry32ofp9r2" FOREIGN KEY (property_id) REFERENCES property(id) NOT DEFERRABLE;
ALTER TABLE ONLY "public"."formal_parameter" ADD CONSTRAINT "fkrgbe5v9eews5psvx4olvhlqak" FOREIGN KEY (parameter_data_type_id) REFERENCES parameter_data_type(id) NOT DEFERRABLE;

ALTER TABLE ONLY "public"."set_of_values" ADD CONSTRAINT "fkhe1a65bc7va9n83gf6169jwi3" FOREIGN KEY (formal_parameter_id) REFERENCES formal_parameter(id) NOT DEFERRABLE;

ALTER TABLE ONLY "public"."strain" ADD CONSTRAINT "fkrub8vbv78rfqu0pceyaqatvel" FOREIGN KEY (type_id) REFERENCES strain_type(id) NOT DEFERRABLE;

ALTER TABLE ONLY "public"."strain_type" ADD CONSTRAINT "fk1h0blwmkpewhj3ncicbhf42vc" FOREIGN KEY (genus_id) REFERENCES strain_genus(id) NOT DEFERRABLE;

ALTER TABLE ONLY "public"."system_user" ADD CONSTRAINT "fknwyqs1v3thng820xlm2x2yj5d" FOREIGN KEY (role_id) REFERENCES role(id) NOT DEFERRABLE;

-- 2021-06-16 20:00:31.849988+00
