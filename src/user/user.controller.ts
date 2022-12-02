import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { SignInDto } from 'src/dto/signin.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService
  ) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Post('signin')
  signIn(@Body() signInDto: SignInDto) {
    return this.userService.signIn(signInDto);
  } 
}