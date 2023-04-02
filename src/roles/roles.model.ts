import { Model, Column, DataType, Table, BelongsToMany } from "sequelize-typescript";
import { User } from "src/users/users.model";
import { UserRoles } from "./user-roles.model";

interface RoleCreationAttrs {
  value: string;
  description: string;
}


//создаём в БД таблицу ролей (админ) с названием 'roles', где id - уникальный идентификатор,
//value - название роли (например админ), description - описание роли, полномочия
@Table({tableName: 'roles'})
export class Role extends Model<Role, RoleCreationAttrs> {
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})  
  id: number;

  @Column({type: DataType.STRING, unique: true, allowNull: false})
  value: string;

  @Column({type: DataType.STRING, allowNull: false})
  description: string;

//декоратор для установления связи между таблицами в БД: связь "многие ко многим",
//то есть у одного пользователя может быть несколько ролей. таблицу userRoles нужно создать
  @BelongsToMany(()=> User, ()=> UserRoles)
   user: User[];
 
}
