import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "src/users/users.model";

// Создаем профайл юзера
interface ProfileCreationAttrs {
    firstName: string;
    surName: string;
    phone: string;
    userId: number;
}

// Создаем таблицу с личными данными юзеров "profiles"
@Table({tableName: 'profiles'})
export class Profile extends Model<Profile, ProfileCreationAttrs> {
    // id
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    // Имя не должно быть пустым
    @Column({type: DataType.STRING, allowNull: false})
    firstName: string;

    // ФАмилия
    @Column({type: DataType.STRING, allowNull: false})
    surName: string;

    // Номер телефона
    @Column({type: DataType.STRING})
    phone: string;

    //id юзера из класса User
    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER, allowNull: false})
    userId: number;


    // К какому пользователю относится
    @BelongsTo(() => User)
    user: User;
}