import "dotenv/config";
import { Pool, QueryResult, QueryResultRow } from "pg";


const connectionString = process.env.DATABASE_URL;

export const pool = new Pool({ connectionString });

export function query<T extends QueryResultRow = QueryResultRow>(
  text: string,
  params?: any[]
): Promise<QueryResult<T>> {
  return pool.query<T>(text, params);
}
