import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';


//здесь в controller создаем эндпоинты: функции для создания и получения ролей,
//оборачиваем в декораторы Post (для создания роли) и Get(получения роли)
//внедряем зависимости и заинжектим класс RolesService
@Controller('roles')
export class RolesController {

constructor(private roleService: RolesService) {}

//в качетсве тела запроса ф-ция принимает dto,
//а в теле функции дергаем соответствующий метод из сервиса
@Post()
create(@Body() dto: CreateRoleDto){
  return this.roleService.createRole(dto);
}


//для получения роли из БД используем декоратор @Param c аргументом value(искомая роль)
@Get('/:value')
getByValue(@Param('value') value: string){
   return this.roleService.getRoleByValue(value);
}


}


//можно тестировать в postman