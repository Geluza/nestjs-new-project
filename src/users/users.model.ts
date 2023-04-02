import { Model, Column, DataType, Table, BelongsToMany } from "sequelize-typescript";
import { Role } from "src/roles/roles.model";
import { UserRoles } from "src/roles/user-roles.model";

interface UserCreationAttrs {
  emal: string;
  password: string;
}


//создаём в БД таблицу пользователей с названием 'users'
@Table({tableName: 'users'})
export class User extends Model<User, UserCreationAttrs> {
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})  
  id: number;

 

  @Column({type: DataType.STRING, unique: true, allowNull: false})
  email: string;

  @Column({type: DataType.STRING, allowNull: false})
  password: string;
   
 
 
  //устанваливем связь между таблицами Role и Users в БД: связь "многие ко многим",
  //таблицу UserRoles нужно создать
  @BelongsToMany (()=> Role, ()=> UserRoles)
  roles: Role[];
}
