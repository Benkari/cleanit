import { pool } from "../db";
import { User } from "../types/user";

export const getUserByUsername = async (username: string): Promise<User> => {
  const { rows } = await pool.query<User>(
    `SELECT * FROM "user" WHERE "user".username = $1`,
    [username]
  );

  return rows?.[0];
};
