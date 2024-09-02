import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { User } from './entities/user.entity';

import { S3ServiceService } from 'src/core/s3_service/s3_service.service';

import { Multer } from 'multer';

import * as crypto from 'crypto';
import axios from 'axios';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly s3Service: S3ServiceService,
  ) {}

  private hashPassword(password: string, log: boolean): string {
    const SALT = 'jIJ@O##J*FKJA"F{]\fs;.pj2049k}LF>|{@:#|"%+_+_F:C<pwfl';
    password = password + password + SALT;
    for (let i = 0; i < 1000; i++) {
      password = crypto.createHmac('sha256', password).digest('hex');
    }
    if (log) {
      console.log('Password hashed:', password);
    }
    return password;
  }

  async create(createUserDto: CreateUserDto, profilePic: Multer.file): Promise<User> {
    let profilePicture: string;

    if (profilePic) {
      profilePicture = await this.s3Service.uploadFile(profilePic, 'innocup-bucket');
    }

    try {
      createUserDto.password = this.hashPassword(createUserDto.password, true);
      const createdAt = new Date().getTime();
      console.log('Creating user:', createUserDto);
      const newUser = this.userRepository.create({
        ...createUserDto,
        profilePicture,
        createdAt,
      });
      console.log('New user:', newUser);
      return await this.userRepository.save(newUser);
    } catch (e) {
      console.log('Error creating user:', e);
      throw new InternalServerErrorException(e);
    }
  }

  // async findAll(): Promise<User[]> {
  //   return await this.userRepository.find();
  // }

  async findById(id: string): Promise<User> {
    const res = await this.userRepository.findOne({ where: { id } });
    return res;
  }

  async findByEmailAndPassword(email: string, password: string): Promise<User> {
    console.log('Finding user by email and password', email, password);
    const hashedPassword = this.hashPassword(password, true);
    const user = await this.userRepository.findOne({
      where: { email, password: hashedPassword },
    });
    if (!user) {
      throw new NotFoundException('User not found or incorrect password');
    }
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto, profilePic: Multer.file): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    
    user.name = updateUserDto.name;
    user.email = updateUserDto.email;
    user.password = updateUserDto.password;
    user.phoneNumber = updateUserDto.phoneNumber;
    user.address = updateUserDto.address
    user.dateOfBirth = updateUserDto.dateOfBirth;

    if (profilePic) {
      console.log('Updating profile picture:', profilePic);
      const profilePicture = await this.s3Service.uploadFile(profilePic, 'innocup-bucket');
      user.profilePicture = profilePicture;
    }

    // Save the updated user
    return await this.userRepository.save(user);
  }

  async updateProfilePicture(id: string, file: Multer.File): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    const profilePicture = await this.s3Service.uploadFile(file, 'innocup-bucket');
    user.profilePicture = profilePicture;

    // Save the updated user
    return await this.userRepository.save(user);
  }

  async remove(id: string): Promise<void> {
    const result = await this.userRepository.delete(id);
    const rmPfp = await this.s3Service.deleteFile(id, 'innocup-bucket');
    if (result.affected === 0) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
  }
}
