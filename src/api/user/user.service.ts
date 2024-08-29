import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { User } from './entities/user.entity';

import * as crypto from 'crypto';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    try{
      createUserDto.password = this.hashPassword(createUserDto.password, true);
      const createdAt = new Date().getTime();
      console.log('Creating user:', createUserDto);
      const newUser = this.userRepository.create({...createUserDto, createdAt});
      return await this.userRepository.save(newUser);
    }catch(e){
      throw new InternalServerErrorException(e);
    }
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOne(id: number): Promise<User> {
    const res = await this.userRepository.findOne({ where: { id } });
    return res; 
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  private hashPassword(password: string, log: boolean): string {
    const SALT = 'jIJ@O##J*FKJA"F{]\fs;.pj2049k}LF>|{@:#|"%+_+_F:C<pwfl';
    password = password + password + SALT;
    for (let i = 0; i < 1000; i++) {
      password = crypto.createHmac('sha256', password).digest('hex');
    }
    console.log('Password hashed:', password);
    return password;
  }
}
