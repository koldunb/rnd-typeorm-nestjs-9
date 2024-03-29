import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'gg-user',
      password: 'Dd22323434',
      database: 'rnd_typeorm_9',
      autoLoadEntities: true,
      synchronize: true,
    }),
    UsersModule,
  ],
})

export class AppModule {}
