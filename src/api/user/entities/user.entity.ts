import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity( {name: 'users'} )
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    dateOfBirth: number;

    @Column()
    email: string;

    @Column()
    phoneNumber: string;

    @Column()
    password: string;
    
    @Column()
    healthInfoId: number;

    @Column()
    createdAt: number;
}