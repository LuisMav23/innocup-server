import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Multer } from 'multer';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('profilePicture'))
  create(@Body() createUserDto: CreateUserDto, @UploadedFile() profilePic: Multer.File) {
    return this.userService.create(createUserDto, profilePic);
  }

  @Get('login')
  findOneByEmailAndPassword(@Query() emailAndPassword: { email: string, password: string }) {
    const { email, password } = emailAndPassword;
    console.log('Finding user by email and password', email, password);
    return this.userService.findByEmailAndPassword(email, password);
  }

  @Get('id/:id')
  findById(@Param('id') id: string) {
    console.log('Finding user by id');
    return this.userService.findById(id);
  }


  @Patch(':id')
  @UseInterceptors(FileInterceptor('profilePicture'))
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto, @UploadedFile() profilePic: Multer.File) {
    return this.userService.update(id, updateUserDto, profilePic);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
