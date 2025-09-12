import { pool } from "../db";
import { City } from "../types/city";
import { Shop } from "../types/shop";
import { User } from "../types/user";

export const getOneShopByCity = async (city: City): Promise<Shop | null> => {
  const sql = `
    SELECT
      s.id,
      s.name,
      s.address,
      c.id   AS city_id,
      c.value,
      c.label
    FROM shop s
    JOIN city c ON c.id = s.city_id
    WHERE LOWER(c.value) = LOWER($1)
    ORDER BY s.id ASC
    LIMIT 1
  `;

  const { rows } = await pool.query(sql, [city]);

  if (rows.length === 0) return null;

  const r = rows[0];
  return {
    id: r.id,
    name: r.name,
    address: r.address,
  };
};

export const getShopByUserId = async (
  userId: User["id"]
): Promise<Shop | null> => {
  const sql = `
    SELECT s.id, s.name, s.address
    FROM user_shop us
    JOIN shop s ON s.id = us.shop_id
    WHERE us.user_id = $1
    ORDER BY s.id
    LIMIT 1
  `;

  const { rows } = await pool.query(sql, [userId]);

  if (!rows.length) return null;

  const r = rows[0];

  return {
    id: r.id,
    name: r.name,
    address: r.address,
  };
};

export const getShopUserRelationId = async (
  shopId: Shop["id"],
  userId: User["id"]
): Promise<number | null> => {
  const sql = `
    SELECT shop_id
    FROM user_shop
    WHERE user_id = $1 AND shop_id = $2
    LIMIT 1
  `;

  const { rows } = await pool.query(sql, [userId, shopId]);

  return rows?.[0];
};

export default { getOneShopByCity, getShopByUserId, getShopUserRelationId };
