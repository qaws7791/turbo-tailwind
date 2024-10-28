import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ShippingService } from './shipping.service';
import { Shipping } from './entities/shipping.entity';
import { CreateShippingInput } from './dto/create-shipping.input';
import { UpdateShippingInput } from './dto/update-shipping.input';

@Resolver(() => Shipping)
export class ShippingResolver {
  constructor(private readonly shippingService: ShippingService) {}

  @Mutation(() => Shipping)
  createShipping(@Args('createShippingInput') createShippingInput: CreateShippingInput) {
    return this.shippingService.create(createShippingInput);
  }

  @Query(() => [Shipping], { name: 'shipping' })
  findAll() {
    return this.shippingService.findAll();
  }

  @Query(() => Shipping, { name: 'shipping' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.shippingService.findOne(id);
  }

  @Mutation(() => Shipping)
  updateShipping(@Args('updateShippingInput') updateShippingInput: UpdateShippingInput) {
    return this.shippingService.update(updateShippingInput.id, updateShippingInput);
  }

  @Mutation(() => Shipping)
  removeShipping(@Args('id', { type: () => Int }) id: number) {
    return this.shippingService.remove(id);
  }
}
