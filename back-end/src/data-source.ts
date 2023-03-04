import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entity/User";
import { WishListItem } from "./entity/WishListItem";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST || "localhost",
  port: 3306,
  username: process.env.DB_USER || "root",
  password: process.env.MYSQL_ROOT_PASSWORD || "",
  database: process.env.DB_NAME || "veracity",
  synchronize: true,
  logging: false,
  entities: [User, WishListItem],
  migrations: [],
  subscribers: [],
});
