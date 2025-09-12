CREATE TYPE user_role AS ENUM ('admin','customer','manager');

CREATE TYPE order_status AS ENUM ('dispatched','in_process','ready','delivered');

CREATE TYPE order_variant AS ENUM ('economy', 'express', 'vip');

CREATE TABLE IF NOT EXISTS city (
  id     SERIAL PRIMARY KEY,
  value  VARCHAR(100) NOT NULL UNIQUE,  
  label  VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS shop (
  id       SERIAL PRIMARY KEY,
  city_id  INT NOT NULL REFERENCES city(id) ON DELETE RESTRICT,
  name     VARCHAR(100) NOT NULL,
  address  VARCHAR(255) NOT NULL,
  CONSTRAINT uq_shop_city_name UNIQUE (city_id, name)
);

CREATE TABLE IF NOT EXISTS "user" (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username   CITEXT NOT NULL UNIQUE,
  email      CITEXT NOT NULL UNIQUE,
  name       TEXT NOT NULL,
  role       user_role NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS user_shop (
  user_id UUID NOT NULL REFERENCES "user"(id) ON DELETE CASCADE,
  shop_id INT  NOT NULL REFERENCES shop(id) ON DELETE CASCADE,
  PRIMARY KEY (user_id, shop_id)
);

CREATE TABLE IF NOT EXISTS "order" (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id  UUID NOT NULL REFERENCES "user"(id) ON DELETE CASCADE,
  shop_id      INT  NOT NULL REFERENCES shop(id) ON DELETE RESTRICT,
  status       order_status NOT NULL,
  quantity     INT NOT NULL,
  pickup       BOOLEAN NOT NULL,
  price        NUMERIC(12,2) NOT NULL,
  variant      order_variant NOT NULL,
  comment      VARCHAR(2056),
  address      VARCHAR(255) NOT NULL,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);



