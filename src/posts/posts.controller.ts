import { UploadedFile, UseInterceptors } from "@nestjs/common";
import { CreatePostDto } from "./dto/create-post.dto";
import {PostsService} from './posts.service';
import { FileInterceptor } from "@nestjs/platform-express";
import { Post } from "@nestjs/common";
import { Controller } from "@nestjs/common";
import { Body } from "@nestjs/common";

@Controller('posts')

export class PostsController {

constructor(private postService: PostsService) {}

@Post()
@UseInterceptors(FileInterceptor('images'))
createPost(@Body() dto: CreatePostDto, @UploadedFile() images) {
    return this.postService.create(dto, images)
}






}