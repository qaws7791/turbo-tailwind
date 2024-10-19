import { Body, Controller, HttpException, Post, Session } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { Auth } from '../auth/decorators/roles.decorator';
import { USER_ROLES } from '../users/entities/user.entity';
import * as secureSession from '@fastify/secure-session';
@Controller('reservations')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @Post()
  @Auth(USER_ROLES.USER, USER_ROLES.ADMIN)
  async createReservation(
    @Body() createReservationDto: CreateReservationDto,
    @Session() session: secureSession.Session,
  ) {
    try {
      const reservation = await this.reservationsService.create(
        session.get('email'),
        createReservationDto,
      );
      return reservation;
    } catch (err) {
      throw new HttpException(err.message, 400);
    }

    return;
  }
}
