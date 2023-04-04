import { HttpException, Injectable, HttpStatus } from '@nestjs/common';
import { User } from './users.model';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { RolesService } from 'src/roles/roles.service';
import { addRoleDto } from './dto/add-role.dto';

//пишем функции для создания и получения пользователей
@Injectable()
export class UsersService {
//конструктор инжектим из класса User, дописываем присвоение ролей из RolesService
    constructor(@InjectModel(User) private userRepository: typeof User,
                                   private roleService: RolesService){}
    //функция для создания пользователя, в качестве параметра передаём dto
    //и сразу присваиваем роль (асинхронная ф-ция) с помощью декоратора set
    async createUser(dto: CreateUserDto) {
        const user = await this.userRepository.create(dto);
        const role = await this.roleService.getRoleByValue("USER");
        await user.$set('roles', [role.id]);
        user.roles = [role]
        return user;
    }

    //функция для получения пользователей 
    //и добавляем в ответе в объекте JSON роль пользователя,
    //у кого то это пустой массив (если не присвоили роль), а у кого то прописана роль
    async getAllUsers() {
        const users = await this.userRepository.findAll({include: {all: true}});
        return users;
    }
   

    //функция для провекри существования пользователя, s ответ возвращается пользователь
   async getUserByEmail(email: string) {
    const user = await this.userRepository.findOne({where: {email}, include: {all: true} })
    return user;
}

async addRole(dto: addRoleDto) {
    const user = await this.userRepository.findByPk(dto.userId);
    const role = await this.roleService.getRoleByValue(dto.value);
    if(role && user) {
        await user.$add('role', role.id);
        return dto;
    }
    throw new HttpException('Пользователь или роль не найдены', HttpStatus.NOT_FOUND)
}

}
