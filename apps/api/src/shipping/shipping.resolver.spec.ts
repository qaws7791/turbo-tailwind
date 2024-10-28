import { Test, TestingModule } from '@nestjs/testing';
import { ShippingResolver } from './shipping.resolver';
import { ShippingService } from './shipping.service';

describe('ShippingResolver', () => {
  let resolver: ShippingResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ShippingResolver, ShippingService],
    }).compile();

    resolver = module.get<ShippingResolver>(ShippingResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
