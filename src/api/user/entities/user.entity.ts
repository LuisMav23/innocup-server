import { HealthInfo } from 'src/api/health_info/entities/health_info.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';

@Entity( {name: 'users'} )
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    dateOfBirth: number;

    @Column()
    email: string;

    @Column()
    phoneNumber: string;

    @Column()
    address: string;

    @Column()
    password: string;

    @Column()
    createdAt: number;
}