import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  initializeTransactionalContext, NAMESPACE_NAME,
  patchTypeORMRepositoryWithBaseRepository
} from "typeorm-transactional-cls-hooked";
import { Repository } from "typeorm";
import { getNamespace } from 'cls-hooked';

function assertTransactionalDecoratorWasUsed() {
  const context = getNamespace(NAMESPACE_NAME);
  if (!context || !context.active) {
    throw new Error('Did you forget to add @Transactional decorator?');
  }
}

function wrap(f) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias

  return function() {
    console.log('Wrapped call');
    assertTransactionalDecoratorWasUsed();
    // eslint-disable-next-line prefer-rest-params
    return f.apply(this, arguments);
  }
}

function patchCheckDecorator() {
  Repository.prototype.save = wrap(Repository.prototype.save);
}

async function bootstrap() {
  initializeTransactionalContext();
  patchTypeORMRepositoryWithBaseRepository();
  patchCheckDecorator();

  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
