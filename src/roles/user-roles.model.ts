import { Model, Column, DataType, Table, ForeignKey } from "sequelize-typescript";
import { User } from "src/users/users.model";
import { Role } from "./roles.model";


//создаём в БД таблицу, связующую юзеров с ролями с названием 'userRoles', где id - уникальный идентификатор,
//roleId - id роли,  userId - id юзера. Последние два параметра - внешние, берутся из существующих таблиц, то есть новых ключей мы не создаём
//декоратор ForeignKey - указание для Sequelize что ключи внешние и берутся из существующих таблиц
//чтобы не захламлять таблицу датами создания и датами обновления ставим false в параметрах createdAt и updatedAt
@Table({tableName: 'UserRoles', createdAt: false, updatedAt: false})
export class UserRoles extends Model<UserRoles> {
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})  
  id: number;

  @ForeignKey(()=>Role)
  @Column({type: DataType.INTEGER})
  roleId: number;

  @ForeignKey(()=> User)
  @Column({type: DataType.INTEGER})
  userId: number;
 
}
