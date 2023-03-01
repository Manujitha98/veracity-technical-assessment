import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { User } from "../entity/User";
import * as bcrypt from "bcrypt";
import generateAuthToken from "../helpers/generateAuthToekn";

export class UserController {
  private userRepository = AppDataSource.getRepository(User);

  //! get all users
  async all(request: Request, response: Response, next: NextFunction) {
    return (await this.userRepository.find()).filter((user) => {
      delete user.password;
      return user;
    });
  }

  //get the profile of the registered user
  async myProfile(request: Request, response: Response, next: NextFunction) {
    const id = parseInt(request.user.id);

    //fetch the user data along with the wish list items
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ["wishListItems"],
    });

    if (!user) {
      response.status(404);
      return "unregistered user";
    }
    //remove the password field from the response
    delete user.password;
    response.status(200);
    return user;
  }

  //register a new user
  async save(request: Request, response: Response, next: NextFunction) {
    const { firstName, lastName, email, password } = request.body;

    //check if the user already exists
    const existingUser = await this.userRepository.findOneBy({ email });

    //if the user exists return an error
    if (existingUser) {
      response.status(400);
      return "this email is already registered";
    }

    //hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = Object.assign(new User(), {
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    //save the user
    const saveduser = await this.userRepository.save(user);
    const token = generateAuthToken(saveduser);
    response.status(200);
    return token;
  }

  //! delete a user
  async remove(request: Request, response: Response, next: NextFunction) {
    const id = parseInt(request.params.id);

    //find the user
    let userToRemove = await this.userRepository.findOneBy({ id });

    //check if the user exists
    if (!userToRemove) {
      response.status(404);
      return "this user not exist";
    }

    //remove user
    await this.userRepository.remove(userToRemove);
    response.status(200);
    return "user has been removed";
  }
}
