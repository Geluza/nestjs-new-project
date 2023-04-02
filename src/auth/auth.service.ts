import { Injectable, Body } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt/dist';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/users/users.model';
import {HttpStatus} from '@nestjs/common/enums';
import {HttpException, UnauthorizedException} from '@nestjs/common/exceptions';

@Injectable()
export class AuthService {
//заинжектим в конструктор UserService
  constructor(private UserService: UsersService,
              private jwtService: JwtService){}


//функция входа в приложение
  async login(@Body() userDto: CreateUserDto){
     const user = await this.validateUser(userDto);
     return this.generateToken(user);
    
    }
   

  //функция регистрации и присвоения токена 
   async registration(@Body() userDto: CreateUserDto){
     const candidate = await this.UserService.getUserByEmail(userDto.email)
     if(candidate) {
        throw new HttpException('пользователь с таким email существует', HttpStatus.BAD_REQUEST)
     }
       
     //если кандидат с таким email не существует, то хэшируем пароль и возвращаем созданный токен
      const hashPassword = await bcrypt.hash(userDto.password, 5);
      const user = await this.UserService.createUser({...userDto, password: hashPassword});
      return this.generateToken(user);
    }

    //функция для генерации токена
     private async generateToken(user: User) {
        const payload = {email: user.email, id: user.id, roles: user.roles}
        return {
            token: this.jwtService.sign(payload)
        }
    }

    //функция для валидации пользователя: пробуем получить юзера по емэйлу
    //и следующим этапом сравниваем введенный пароль с паролем из БД
    private async validateUser(userDto: CreateUserDto) {
     const user = await this.UserService.getUserByEmail(userDto.email);
     const passwordEquals = await bcrypt.compare(userDto.password, user.password);
     if(user && passwordEquals) {
        return user;
     }
     throw new UnauthorizedException({message: "Вы ввели некорректный email или пароль"})
    }



}
