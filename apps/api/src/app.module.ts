import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './users/entities/user.entity';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import configuration from './config/configuration';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './auth/guards/roles.guard';
import { BoardsModule } from './boards/boards.module';
import { Board } from './boards/entities/board.entity';\
import { ArticlesModule } from './articles/articles.module';
import { Article } from './articles/entities/article.entity';
import { CommonModule } from './common/common.module';
import { EventsModule } from './events/events.module';
import { Event, EventOperationTime } from './events/entities/event.entity';
import { ReservationsModule } from './reservations/reservations.module';
import { Reservation } from './reservations/entities/reservation.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [configuration], isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: configuration().databaseUrl,
      ssl: {
        rejectUnauthorized: false,
      },
      entities: [User, Board, Article, Event, EventOperationTime, Reservation],
      synchronize: configuration().NODE_ENV === 'dev',
      logging: true,
    }),
    UsersModule,
    AuthModule,
    BoardsModule,
    ArticlesModule,
    CommonModule,
    EventsModule,
    ReservationsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
