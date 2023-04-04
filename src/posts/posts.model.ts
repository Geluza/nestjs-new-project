import { Model, Column, DataType, Table, BelongsToMany, HasOne, ForeignKey, BelongsTo } from "sequelize-typescript";
import { User } from "src/users/users.model";

//Создать модуль "текстовый блок".Для чего используется на практике:
//У вас на главной странице сайта есть текст-приветствие. А еще есть блок из трех преимуществ (У каждого картинка, текст, заголовок). Еще какой-то блок с текущей акцией и пр.
// Фронтэндер может все эти тексты вшить в код, но лучше, чтобы админ мог это редактировать. 
//Таким образом необходимы CRUD-методы для управления такими блоками: - уникальное название для поиска (например, main-hero-text), название 
//картинка, текст, ГРУППА - (например, main-page - чтобы все блоки главной страницы или другой группы фронтэнд мог получать одним запросом)

interface PostCreationAttrs {
  name: string;
  title: string;
  content: string;
  images: string;
  group: string;
  userId: number;
}


//создаём в БД таблицу постов с названием 'posts'
@Table({tableName: 'posts'})
export class Post extends Model <Post, PostCreationAttrs> {
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})  
  id: number;

  @Column({type: DataType.STRING, unique: true, allowNull: false})
  name: string;

  @Column({type: DataType.STRING, unique: true, allowNull: false})
  title: string;

  @Column({type: DataType.STRING, allowNull: false})
  content: string;

  @Column({type: DataType.STRING, allowNull: false})
  group: string;
   
  @Column({type: DataType.STRING, allowNull: false})
  images: string;

  @ForeignKey(() => User)
  @Column({type: DataType.INTEGER,
           allowNull: false})
  userId: number;

  
  @BelongsTo(()=> User)
  author: User;
 
}
