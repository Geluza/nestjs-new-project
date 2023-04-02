import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateProfileDto } from './dto/create-profile.dto';
import { Profile } from './profiles.model';

//здесь создаем ф-ции для обновления, получения, создания и удаления профиля
@Injectable()
export class ProfilesService {

    constructor(@InjectModel(Profile) private profileRepository: typeof Profile) {}

    // Создание профиля
    async createProfile(dto: CreateProfileDto, id: number) {
        const profile = await this.profileRepository.create({...dto, userId: id});
        return profile;
    }

    // Получение профиля
    async getProfile(id: number) {
        const profile = await this.profileRepository.findByPk(id);
        return profile;
    }

    // Получение всех профилей
    async getAllProfiles() {
        const profiles = await this.profileRepository.findAll();
        return profiles;
    }

    // редактирование профиля
    async updateProfile(dto: CreateProfileDto, id: number) {
        const profile = await this.profileRepository.update({...dto, userId: id}, {where: {id}});
        return profile;
    }

    // Удаление профиля
    async deleteProfile(id: number) {
        const profile = await this.profileRepository.destroy({where: {id}});
        return profile;
    }
}