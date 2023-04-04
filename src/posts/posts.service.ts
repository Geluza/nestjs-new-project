import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FilesService } from 'src/files/files.service';
import { Post } from './posts.model';
import { CreatePostDto } from './dto/create-post.dto';

@Injectable()
export class PostsService {
   
    constructor(@InjectModel(Post) private postRepository: typeof Post,
    private fileService: FilesService) {}

    async create(dto: CreatePostDto, images: any) {
        const fileName = await this.fileService.createFile(images)
        const post = await this.postRepository.create({...dto, images: fileName});
        return post;

    }


}
