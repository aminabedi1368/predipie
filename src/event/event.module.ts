import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { Event } from './event.entity'; // فرض کنید entity به این شکل است
import { EventEmitter2 } from '@nestjs/event-emitter'; // EventEmitter

@Module({
  imports: [
    TypeOrmModule.forFeature([Event]),
  ],
  providers: [EventService, EventEmitter2],
  controllers: [EventController],
  exports: [EventService],
})
export class EventModule {}