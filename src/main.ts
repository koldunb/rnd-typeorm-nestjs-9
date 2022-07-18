import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  initializeTransactionalContext,
  patchRepositoryManager,
  patchTypeORMRepositoryWithBaseRepository
} from "typeorm-transactional-cls-hooked";
import { DataSource } from "typeorm";

async function bootstrap() {
  initializeTransactionalContext();
  patchTypeORMRepositoryWithBaseRepository();
  //patchRepositoryManager(DataSource.prototype);

  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
