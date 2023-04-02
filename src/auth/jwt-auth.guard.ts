import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { UnauthorizedException } from '@nestjs/common/exceptions';
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";

//класс CanActivate для установки допустимых ролей и ограничения доступа к операциям
@Injectable()
export class JwtAuthGuard implements CanActivate {

    constructor(private jwtService: JwtService) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const req = context.switchToHttp().getRequest();
        // Пытаемся извлечь токен JWT из заголовков запроса и проверяем его
        try {
            const authHeader = req.headers.authorization;
            const bearer = authHeader.split(' ')[0];
            const token = authHeader.split(' ')[1];

          //если не совпадает
            if(bearer !== "Bearer" || !token) {
                throw new UnauthorizedException({message: "Пользователь не авторизован"});
            }

            // При успешной верификации раскодируем токен, помещаем юзера в requect и возвращаем тру, значит эндпоинт разрешен
            const user = this.jwtService.verify(token);
            req.user = user;
            return true;
        } catch (e) {
            throw new UnauthorizedException({message: "Пользователь не авторизован"});
        }
    }
}
