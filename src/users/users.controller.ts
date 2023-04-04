import {Body, Get, Post, Controller, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles-auth.decorator';
import { addRoleDto } from './dto/add-role.dto';



//здесь создаём эндпоинты для создания и получения пользователей
@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}
//при создании пользователя в качестве аргумента берем userDto
  @Post()
  create(@Body () userDto: CreateUserDto) {
    return this.usersService.createUser(userDto)
  }


  //после этого можем тестировать запросы в Postman
  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  @Get ()
  getAll() {
    return this.usersService.getAllUsers();
  }

//выдача ролей: доступно админу
  @Roles("ADMIN")
 @UseGuards(RolesGuard)
  @Post('/role')
  addRole(@Body() dto: addRoleDto) {
    return this.usersService.addRole(dto);
  }






}

//