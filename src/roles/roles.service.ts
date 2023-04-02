import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Role } from './roles.model';

//здесь в roles.service пишем функции для осуществления добавления данных в
//в непосредственно базу данных и для получения из БД роли. В качестве арщгумента 
//используем объект dto (создаём в текщей папке dto). Конструктор класса 
//инжектим с помощью декоратора InjectModel
@Injectable()
export class RolesService {
    constructor(@InjectModel(Role) private roleRepository: typeof Role){}

   async createRole(dto: CreateRoleDto) {
     const role = await this.roleRepository.create(dto);
     return role;
   }

   async getRoleByValue(value: string) {
       const role = await this.roleRepository.findOne({where: {value}});
       return role;
   }



}
