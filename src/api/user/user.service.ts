import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { User } from './entities/user.entity';

import * as crypto from 'crypto';
import axios from 'axios';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
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

  async create(createUserDto: CreateUserDto): Promise<User> {

    try{
      createUserDto.password = this.hashPassword(createUserDto.password, true);
      const createdAt = new Date().getTime();
      console.log('Creating user:', createUserDto);
      const newUser = this.userRepository.create({...createUserDto, createdAt});
      console.log('New user:', newUser);
      await this.userRepository.save(newUser);
      
      const healthData = createUserDto.healthInfo;
      const healthInfo = {
        userId: newUser.id,
        ...healthData
      };

      console.log('Creating health info:', healthInfo);

      await axios.post('http://localhost:3000/health-info', healthInfo);

      return newUser;
    }catch(e){
      console.log('Error creating user:', e);
      throw new InternalServerErrorException(e);
    }
  }

  // async findAll(): Promise<User[]> {
  //   return await this.userRepository.find();
  // }

  async findOneById(id: string): Promise<User> {
    const res = await this.userRepository.findOne({ where: { id } });
    return res; 
  }

  async findOneByEmailAndPassword(email: string, password: string): Promise<User> {
    const hashedPassword = this.hashPassword(password, true);
    const user = await this.userRepository.findOne({ where: { email, password: hashedPassword } });
    if (!user) {
      throw new NotFoundException('User not found or incorrect password');
    }
    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }
  
  async remove(id: string): Promise<void> {
    const result = await this.userRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
  }
}
