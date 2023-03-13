import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TodoModule } from './todo/todo.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { FirebaseModule } from './firebase/firebase.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        uri: config.get<string>('DATABASE_URL'),
      }),
    }),
    FirebaseModule,
    TodoModule,
  ],
})
export class AppModule {
  // We can use the following middleware to check the user token or use the auth guard
  // configure(consumer: MiddlewareConsumer) {
  // consumer.apply(AuthMiddleware).forRoutes('todos');
  // }
}
