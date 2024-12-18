import { Body, Controller, Post, Res } from '@nestjs/common';
import { UserService } from './users.service';
import { Response } from 'express';

@Controller('api/user')
export class UsersController {
  constructor(private readonly UserService: UserService) {}

  @Post('login')
  async userLogin(
    @Body() userObj: any,
    @Res({ passthrough: true }) response: Response,
  ) {
    return await this.UserService.loginUser(userObj, response);
  }

  @Post('signup')
  async userSignup(@Body() userObj: any) {
    return await this.UserService.registerUser(userObj);
  }
}
