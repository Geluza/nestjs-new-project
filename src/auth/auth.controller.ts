import { Controller, Post, Body} from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';


//пишем контроллер для входа и регистрации в приложение (авторизация),
//оборачивамем в декоратор Controller
//в качестве аргументов ф-ций принимается ф-ция createUserDto
@Controller('auth')
export class AuthController {
//в конструкторе инжектируем AuthService
constructor(private authService: AuthService) {}


//вход в приложение: из AuthService дергаем метод login, в качестве аргумента userDto
 @Post('/login')
 login(@Body() userDto: CreateUserDto){
    return this.authService.login(userDto)
 }


 //регистрация в приложении: из AuthService дергаем метод regictration
 @Post('/registration')
 registration(@Body() userDto: CreateUserDto){
    return this.authService.registration(userDto)
 }




}
