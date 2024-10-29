import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { MercuriusDriver, MercuriusDriverConfig } from '@nestjs/mercurius';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import configuration from './config/configuration';
import { User } from './users/entities/user.entity';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './product/product.module';
import { OrderModule } from './order/order.module';
import { CartModule } from './cart/cart.module';
import { PaymentModule } from './payment/payment.module';
import { ShippingModule } from './shipping/shipping.module';
import { AddressModule } from './address/address.module';
import { ReviewModule } from './review/review.module';
import { Product } from './product/entities/product.entity';
import { ProductCategory } from './product/entities/product-category.entity';
import { ProductOptionGroup } from './product/entities/product-option-group.entity';
import { ProductOption } from './product/entities/product-option.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    GraphQLModule.forRoot<MercuriusDriverConfig>({
      driver: MercuriusDriver,
      graphiql: true,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: configuration().databaseUrl,
      ssl: {
        rejectUnauthorized: false,
      },
      entities: [
        User,
        Product,
        ProductCategory,
        ProductOptionGroup,
        ProductOption,
      ],
      synchronize: configuration().NODE_ENV === 'dev',
      logging: true,
    }),
    UsersModule,
    AuthModule,
    ProductModule,
    OrderModule,
    CartModule,
    PaymentModule,
    ShippingModule,
    AddressModule,
    ReviewModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
