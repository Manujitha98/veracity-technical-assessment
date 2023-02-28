import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { WishListItem } from "./WishListItem";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => WishListItem, (wishlistitem) => wishlistitem.user)
  wishListItems: WishListItem[];
}
