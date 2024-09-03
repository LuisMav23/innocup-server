import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { User } from '../../user/entities/user.entity'; 

@Entity({ name: 'emergency_contacts' })
export class EmergencyContact {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => User, user => user.emergencyContacts)
    @JoinColumn({ name: 'userId' })
    user: User;

    @Column()
    name: string;

    @Column()
    phoneNumber: string;

    @Column()
    relationship: string;

    @Column()
    createdAt: number;
}