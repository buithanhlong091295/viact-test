import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import appConfig from './common/config/app.config';
import databaseConfig from './common/config/database.config';
import jwtConfig from './common/config/jwt.config';
import { validate } from './common/validation/env.validation';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import swaggerConfig from './common/config/swagger.config';
import { ResponseTransformInterceptor } from './common/interceptors/response-transform.interceptor';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, jwtConfig, databaseConfig, swaggerConfig],
      validate,
    }),
    DatabaseModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseTransformInterceptor,
    },
  ],
})
export class AppModule {}
