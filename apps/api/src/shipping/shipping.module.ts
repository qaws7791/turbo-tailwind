import { Module } from '@nestjs/common';
import { ShippingService } from './shipping.service';
import { ShippingResolver } from './shipping.resolver';

@Module({
  providers: [ShippingResolver, ShippingService],
})
export class ShippingModule {}
