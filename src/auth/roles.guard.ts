import { CanActivate, ExecutionContext, Injectable, UnauthorizedException, HttpException, HttpStatus } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import {Reflector} from "@nestjs/core";
import { Observable } from "rxjs";
import { ROLES_KEY } from "./roles-auth.decorator";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private jwtService: JwtService,
                private reflector: Reflector) {}

    // Функция для проверки наличия необходимых прав у пользователя
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        try {
            const requiredRoles = this.reflector.getAllAndOverride(ROLES_KEY, [
                context.getHandler(),
                context.getClass(),
            ]);
          //если ролей нет возвращаем истину и даем доступ к операции
            if(!requiredRoles) {
              return true;
          }
            const req = context.switchToHttp().getRequest(); 
            // Проверка авторизации и прав пользователя
            const authHeader = req.headers.authorization;
            const bearer = authHeader.split(' ')[0];
            const token = authHeader.split(' ')[1];
            
            // Если пользователь не авторизован, то выдаем ошибку
            if(bearer !== "Bearer" || !token) {
                throw new UnauthorizedException({message: "Пользователь не авторизован"});
            }
            
            // Если пользователь авторизован, то получаем его данные и проверяем права
            const user = this.jwtService.verify(token);
            req.user = user;
            return user.roles.some(role => requiredRoles.includes(role.value));
            // Если проверка завершена успешно, то разрешаем доступ
            // Если пользователь не имеет необходимых прав, то выдаем исключение
            // и запрещаем выполнение действия
        } catch (e) {
            throw new HttpException("Нет доступа", HttpStatus.FORBIDDEN);
        }
    }
}

//FORBIDDEN - нет доступа