import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { Sequelize } from 'sequelize';
import { SequelizeModule } from '@nestjs/sequelize';
import { Post } from './posts.model';
import { FilesModule } from 'src/files/files.module';
import { User } from 'src/users/users.model';

@Module({
  providers: [PostsService],
  controllers: [PostsController],
  imports: [
    SequelizeModule.forFeature([Post, User]),
    FilesModule
  ]
})
export class PostsModule {}
