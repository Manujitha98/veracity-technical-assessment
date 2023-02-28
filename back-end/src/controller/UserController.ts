import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { User } from "../entity/User";
import * as bcrypt from "bcrypt";
import generateAuthToken from "../helpers/generateAuthToekn";

export class UserController {
  private userRepository = AppDataSource.getRepository(User);

  async all(request: Request, response: Response, next: NextFunction) {
    return this.userRepository.find();
  }

  async one(request: Request, response: Response, next: NextFunction) {
    const id = parseInt(request.params.id);

    //fetch the user data along with the wish list items
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ["wishListItems"],
    });

    if (!user) {
      return "unregistered user";
    }
    //remove the password field from the response
    delete user.password;
    return user;
  }

  async save(request: Request, response: Response, next: NextFunction) {
    const { firstName, lastName, email, password } = request.body;

    //hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = Object.assign(new User(), {
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    const saveduser = await this.userRepository.save(user);
    console.log(saveduser);
    const token = generateAuthToken(saveduser);
    return token;
  }

  async remove(request: Request, response: Response, next: NextFunction) {
    const id = parseInt(request.params.id);

    let userToRemove = await this.userRepository.findOneBy({ id });

    if (!userToRemove) {
      return "this user not exist";
    }

    await this.userRepository.remove(userToRemove);

    return "user has been removed";
  }
}
