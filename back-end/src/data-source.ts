import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entity/User";
import { WishListItem } from "./entity/WishListItem";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "",
  database: "veracity",
  synchronize: true,
  logging: false,
  entities: [User, WishListItem],
  migrations: [],
  subscribers: [],
});
