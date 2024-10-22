// import { IsDate, IsNotEmpty, Min, Validate } from 'class-validator';
// import { ApiProperty } from '@nestjs/swagger';
// import { IsEndTimeAfterStartTime } from '../validators/is-end-time-after-start-time';

// export class CreateEventDto {

//   @ApiProperty({ example: 'NestJS Workshop', description: 'Title of the event' })
//   @IsNotEmpty()
//   title: string;

//   @ApiProperty({ example: 'A workshop on NestJS', description: 'Description of the event' })
//   @IsNotEmpty()
//   description: string;

//   @ApiProperty({ example: '2023-12-01T10:00:00Z', description: 'Start time of the event' })
//   @IsDate()
//   startTime: Date;

//   @ApiProperty({ example: '2023-12-01T15:00:00Z', description: 'End time of the event' })
//   @IsDate()
//   @IsEndTimeAfterStartTime({ message: 'End time must be after start time' })
//   endTime: Date;

//   @ApiProperty({ example: 100, description: 'Capacity of the event' })
//   @Min(1)
//   capacity: number;
// }

import { IsDate, IsNotEmpty, Min, Validate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsEndTimeAfterStartTime } from '../validators/is-end-time-after-start-time';

export class CreateEventDto {

  @ApiProperty({ 
    example: 'NestJS Workshop', 
    description: 'Title of the event', 
    required: true 
  })
  @IsNotEmpty()
  title: string;

  @ApiProperty({ 
    example: 'A workshop on NestJS', 
    description: 'Description of the event', 
    required: true 
  })
  @IsNotEmpty()
  description: string;

  @ApiProperty({ 
    example: '2023-12-01T10:00:00Z', 
    description: 'Start time of the event', 
    required: true 
  })
  @IsDate()
  startTime: Date;

  @ApiProperty({ 
    example: '2023-12-01T15:00:00Z', 
    description: 'End time of the event', 
    required: true 
  })
  @IsDate()
  @IsEndTimeAfterStartTime({ message: 'End time must be after start time' })
  endTime: Date;

  @ApiProperty({ 
    example: 100, 
    description: 'Capacity of the event', 
    required: true,
    minimum: 1 
  })
  @Min(1)
  capacity: number;
}
