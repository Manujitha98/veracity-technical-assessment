import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { User } from "../entity/User";
import * as bcrypt from "bcrypt";
import generateAuthToken from "../helpers/generateAuthToekn";

export class AuthController {
  private userRepository = AppDataSource.getRepository(User);

  async login(request: Request, response: Response, next: NextFunction) {
    const { email, password } = request.body;

    //find user by email
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      response.status(400);
      return "invalid email or password";
    }

    //compare password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      response.status(400);
      return "invalid email or password";
    }

    //generate auth token
    const token = generateAuthToken(user);
    response.status(200);
    return token;
  }
}
