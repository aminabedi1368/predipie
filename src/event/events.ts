// src/event/events.ts

export class EventRegisteredEvent {
    constructor(public readonly userId: number, public readonly eventId: number) {}
  }
  