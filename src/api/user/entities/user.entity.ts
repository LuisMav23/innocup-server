import { EmergencyContact } from 'src/api/emergency_contact/entities/emergency_contact.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, OneToMany } from 'typeorm';

@Entity( {name: 'users'} )
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    
    @Column()
    email: string;
    
    @Column()
    phoneNumber: string;
    
    @Column()
    dateOfBirth: number;

    // @Column()
    // gender: string;

    // @Column()
    // PhilhealthNo: string;

    @Column()
    address: string;

    @Column()
    password: string;

    @Column()
    profilePicture: string;

    @Column()
    createdAt: number;

    @OneToMany(() => EmergencyContact, emergencyContact => emergencyContact.user)
    emergencyContacts: EmergencyContact[];
}