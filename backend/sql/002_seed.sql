BEGIN;

INSERT INTO city (value, label) VALUES
  ('vienna','Vienna'),
  ('graz','Graz'),
  ('linz','Linz'),
  ('salzburg','Salzburg'),
  ('innsbruck','Innsbruck'),
  ('klagenfurt','Klagenfurt'),
  ('villach','Villach'),
  ('wels','Wels'),
  ('stpölten','St. Pölten')
ON CONFLICT DO NOTHING;

INSERT INTO shop (city_id, name, address)
VALUES
  ((SELECT id FROM city WHERE value = 'vienna'),     'Vienna Central Shop',     'Main Street 1, Vienna'),
  ((SELECT id FROM city WHERE value = 'graz'),       'Graz Central Shop',       'Main Street 1, Graz'),
  ((SELECT id FROM city WHERE value = 'linz'),       'Linz Central Shop',       'Main Street 1, Linz'),
  ((SELECT id FROM city WHERE value = 'salzburg'),   'Salzburg Central Shop',   'Main Street 1, Salzburg'),
  ((SELECT id FROM city WHERE value = 'innsbruck'),  'Innsbruck Central Shop',  'Main Street 1, Innsbruck'),
  ((SELECT id FROM city WHERE value = 'klagenfurt'), 'Klagenfurt Central Shop', 'Main Street 1, Klagenfurt'),
  ((SELECT id FROM city WHERE value = 'villach'),    'Villach Central Shop',    'Main Street 1, Villach'),
  ((SELECT id FROM city WHERE value = 'wels'),       'Wels Central Shop',       'Main Street 1, Wels'),
  ((SELECT id FROM city WHERE value = 'stpölten'),   'St. Pölten Central Shop', 'Main Street 1, St. Pölten')
ON CONFLICT DO NOTHING;

WITH upsert_manager AS (
  INSERT INTO "user" (username, email, name, role)
  VALUES ('manager1', 'manager1@example.com', 'Max Manager', 'manager')
  ON CONFLICT (username) DO UPDATE
    SET email = EXCLUDED.email
  RETURNING id
),
upsert_customer AS (
  INSERT INTO "user" (username, email, name, role)
  VALUES ('customer1', 'customer1@example.com', 'Chris Customer', 'customer')
  ON CONFLICT (username) DO UPDATE
    SET email = EXCLUDED.email
  RETURNING id
)
INSERT INTO user_shop (user_id, shop_id)
SELECT m.id, s.id
FROM upsert_manager m
CROSS JOIN shop s
ON CONFLICT DO NOTHING;

WITH cust AS (
  SELECT id FROM "user" WHERE username = 'customer1'
),
chosen_shop AS (

  SELECT id AS shop_id, name FROM shop
  WHERE city_id = (SELECT id FROM city WHERE value = 'vienna')
  LIMIT 1
),
pairs(status, variant, idx) AS (
  VALUES
    ('dispatched'::order_status, 'economy'::order_variant, 1),
    ('in_process'::order_status, 'express'::order_variant, 2),
    ('ready'::order_status,      'vip'::order_variant,     3),
    ('delivered'::order_status,  'economy'::order_variant, 4),
    ('dispatched'::order_status, 'express'::order_variant, 5),
    ('in_process'::order_status, 'vip'::order_variant,     6),
    ('ready'::order_status,      'economy'::order_variant, 7),
    ('delivered'::order_status,  'vip'::order_variant,     8)
)
INSERT INTO "order"
  (customer_id, shop_id, status, quantity, pickup, price, variant, comment, address)
SELECT
  cust.id,
  chosen_shop.shop_id,
  pairs.status,
  (pairs.idx % 5) + 1                           AS quantity,
  (pairs.idx % 2 = 0)                           AS pickup,
  25 + 5 * pairs.idx                            AS price,
  pairs.variant,
  'Seed order #' || pairs.idx || ' - ' ||
    pairs.status || ' / ' || pairs.variant      AS comment,
  'Customer Address, ' || chosen_shop.name      AS address
FROM cust, chosen_shop, pairs;
COMMIT;
