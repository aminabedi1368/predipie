import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from './event.entity';
import { CreateEventDto } from './dto/create-event.dto';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { EventRegisteredEvent } from './events';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Event)
    private eventsRepository: Repository<Event>,
    private eventEmitter: EventEmitter2,
  ) {}

  async registerUserForEvent(userId: number, eventId: number): Promise<void> {
    console.log('Registering user:', userId, 'for event:', eventId);
    this.eventEmitter.emit(
      'event.registered',
      new EventRegisteredEvent(userId, eventId),
    );
  }

  async create(createEventDto: CreateEventDto, organizerId: number) {
    console.log('Creating event with:', createEventDto);

    const event = this.eventsRepository.create({
      ...createEventDto });

    console.log('Event object before saving:', event);

    try {
      return await this.eventsRepository.save(event);
    } catch (error) {
      console.error('Error saving event:', error);
      throw error;
    }
  }

  async findOne(id: number): Promise<Event> {
    return this.eventsRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    await this.eventsRepository.delete(id);
  }
}
