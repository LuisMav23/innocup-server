import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { User } from '../../user/entities/user.entity'; 

@Entity()
export class EmergencyContact {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => User, user => user.id)
    @JoinColumn({ name: 'userId' })
    userId: string;

    @Column()
    name: string;

    @Column()
    phoneNumber: string;

    @Column()
    relationship: string;
}