import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './users.model';
import ApiResponse from 'src/utils/ApiResponse';
import { IUserRegister, TokenPayload } from 'src/interfaces/UserTypes';
import { ErrorMessages, SuccessMessages } from 'src/enums/Messages';
import { v4 as uuidv4 } from 'uuid';
const bcrypt = require('bcrypt');
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
    private readonly jwtService: JwtService,
  ) {}

  async loginUser(payload, response: Response) {
    const user = await this.userModel
      .findOne({ username: payload.username })
      .exec();

    if (user) {
      const isValidPassword = await bcrypt.compare(
        payload.password,
        user.password,
      );

      if (isValidPassword) {
        const tokenPayload: TokenPayload = {
          userId: user.userId,
        };
        const token = await this.jwtService.signAsync(tokenPayload, {
          secret: process.env.JWT_TOKEN_SECRET,
          expiresIn: process.env.JWT_TOKEN_EXPIRESIN,
        });

        response.cookie('auth', token, {
          secure: true,
          httpOnly: true,
          maxAge: parseInt(process.env.COOKIE_MAXAGE),
        });

        return new ApiResponse(true, 200, 'User authenticated.', null);
      } else {
        return new ApiResponse(false, 200, 'Invalid credentials!', null);
      }
    } else {
      return new ApiResponse(false, 200, 'User not found!', null);
    }
  }

  async registerUser(payload: IUserRegister) {
    const user = await this.userModel
      .findOne({ username: payload.username })
      .exec();

    if (user) {
      return new ApiResponse(
        false,
        200,
        ErrorMessages.USER_ALREADY_EXIST,
        null,
      );
    } else {
      const userId = 'uId-' + uuidv4();
      const password = await bcrypt.hash(
        payload.password,
        process.env.HASH_SALT,
      );

      await new this.userModel({
        userId,
        password,
        username: payload.username,
        fullName: '',
        role: 'User',
        isDeleted: false,
        isActive: true,
        isEmailVerified: false,
      }).save();

      return new ApiResponse(true, 200, SuccessMessages.USER_REGISTERED, null);
    }
  }
}
