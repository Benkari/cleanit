import { pool } from "../db";
import { NewOrder, Order, OrderStatus } from "../types/order";
import { Shop } from "../types/shop";
import { User } from "../types/user";

export const getOrdersByShopId = async (
  shopId: Shop["id"],
  userId: User["id"]
): Promise<Order[]> => {
  const sql = `
    SELECT
      o.id,
      o.status,
      o.created_at,
      o.pickup,
      o.quantity,
      o.variant,
      o.comment,
      o.address,
      o.price,

      json_build_object(
        'id', cst.id,
        'username', cst.username,
        'email', cst.email,
        'name', cst.name
      ) AS customer,

      json_build_object(
        'id', s.id,
        'name', s.name,
        'address', s.address
      ) AS shop

    FROM "order" o
      JOIN "user" cst ON cst.id = o.customer_id
      JOIN shop s      ON s.id = o.shop_id
      JOIN city c      ON c.id = s.city_id
      LEFT JOIN user_shop us ON us.shop_id = s.id
      LEFT JOIN "user" st    ON st.id = us.user_id

    WHERE o.shop_id = $1
      AND EXISTS (
          SELECT 1
          FROM user_shop
          WHERE user_id = $2
            AND shop_id = $1
        )
    GROUP BY o.id, cst.id, s.id, c.id
    ORDER BY o.created_at DESC;
  `;

  const { rows } = await pool.query(sql, [shopId, userId]);
  return rows;
};

export const addNewOrder = async (
  customerId: string,
  newOrder: NewOrder,
  shop: Shop,
  price: number,
  initialStatus: OrderStatus
): Promise<Partial<Order>> => {
  const sql = `
    INSERT INTO "order"
      (customer_id, shop_id, status, quantity, pickup, price, comment, address, variant)
    VALUES
      ($1, $2, $3, $4, $5, $6, $7, $8, $9)
    RETURNING
      id, customer_id, shop_id, status, quantity, pickup, price, comment, address, created_at, updated_at
  `;

  const params = [
    customerId,
    shop.id,
    initialStatus,
    newOrder.quantity,
    newOrder.pickup,
    price,
    newOrder.comment ?? null,
    newOrder.address,
    newOrder.variant,
  ];

  const { rows } = await pool.query<Partial<Order>>(sql, params);
  return rows[0];
};

export default {
  getOrdersByShopId,
  addNewOrder,
};
