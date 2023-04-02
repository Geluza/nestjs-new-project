import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { forwardRef } from '@nestjs/common';

//регистрация через JWT
//в опциях JWTModule сразу указываем ключ secret из .development.env
//или если его нет - "SECRET", signOprions - время жизни токена
@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    forwardRef(()=> UsersModule),
    JwtModule.register({
      secret: process.env.PRIVATE_KEY || "SECRET",
      signOptions: {
        expiresIn: '24h'
      }

    })
  ], 
  exports: [AuthService,
           JwtModule
]
})
export class AuthModule {}
