import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateDto } from './dto/create-.dto';
import { UpdateDto } from './dto/update-.dto';
import { SetMetadata } from '@nestjs/common';
import type { Request } from 'express';
import { AuthGuard } from '../auth/guards/aut.guard';

@Controller('/user')
@UseGuards(AuthGuard)
export class UserController {
  constructor(private readonly Service: UserService) { }
   
  @Post()
  create(@Body() createDto: CreateDto) {
    return "Hello";
  }

  @Get()
  findAll() {
    return this.Service.findAll();
  }

  @Get('/profile')
  profile(@Req() request:Request) {
  return request.user
  }

  @Get('/test/:id') 
  findOne(@Param('id') id: string) {
    return this.Service.findOne(+id);
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDto: UpdateDto) {
    return this.Service.update(+id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.Service.remove(+id);
  }
}
