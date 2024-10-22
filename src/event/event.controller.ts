import { Controller, Post, Body, UseGuards, Get, Param, Delete, Req } from '@nestjs/common';
import { EventService } from './event.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { UserRole } from '../user/user.entity';
import { CreateEventDto } from './dto/create-event.dto';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('events')
@Controller('events')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Post()
  @ApiOperation({ summary: 'Create a new event (Admin only)' })
  @ApiResponse({ status: 201, description: 'Event successfully created.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  create(@Body() createEventDto: CreateEventDto, @Req() req) {
    return this.eventService.create(createEventDto, req.user.userId);
  }


  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiOperation({ summary: 'Get event details by id' })
  @ApiResponse({ status: 200, description: 'Event details returned.' })
  @ApiResponse({ status: 404, description: 'Event not found.' })
  findOne(@Param('id') id: string) {
    return this.eventService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/register')
  @ApiOperation({ summary: 'Register for an event' })
  @ApiResponse({ status: 200, description: 'User successfully registered for the event.' })
  @ApiResponse({ status: 404, description: 'Event not found or no capacity available.' })
  register(@Param('id') id: string, @Req() req) {
    return this.eventService.registerUserForEvent(+id, req.user.userId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete an event (Admin only)' })
  @ApiResponse({ status: 200, description: 'Event successfully deleted.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  remove(@Param('id') id: string) {
    return this.eventService.remove(+id);
  }

//   @UseGuards(JwtAuthGuard)
//   @Post(':id/register')
//   register1(@Param('id') id: string, @Req() req) {
//     // return this.eventService.registerForEvent(+id, req.user.userId);
//     return this.eventService.registerUserForEvent(+id, req.user.userId);
//   }
}
