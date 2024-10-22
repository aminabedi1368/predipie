// src/event/event.listener.ts

import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { EventRegisteredEvent } from './events';

@EventsHandler(EventRegisteredEvent)
export class EventRegisteredEventHandler implements IEventHandler<EventRegisteredEvent> {
  handle(event: EventRegisteredEvent) {
    console.log(`User with ID ${event.userId} registered for event with ID ${event.eventId}`);
    // در اینجا می‌توانید عمل دیگری انجام دهید، مانند ارسال ایمیل یا ذخیره در پایگاه داده
  }
}
