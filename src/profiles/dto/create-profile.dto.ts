import { IsString, IsPhoneNumber, IsNumber, IsOptional } from "class-validator";

export class CreateProfileDto {
    @IsString()
    firstName: string;
    @IsString()
    surName: string;
    @IsString()
    @IsPhoneNumber("RU")
    phone: string;
    @IsNumber()
    @IsOptional()
    userId?: number;
}
