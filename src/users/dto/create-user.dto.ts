//dto для создания пользователя (объект передачи данных)


export class CreateUserDto {
    readonly email: string;
    readonly password: string;
}