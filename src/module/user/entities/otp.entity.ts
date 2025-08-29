import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "./user.entity";

@Entity("otp")
export class OtpEntity {
    @PrimaryGeneratedColumn("increment")
    id : number 
    @Column()
    code : string
    @Column()
    expired_code : Date
    @Column()
    userId : number 
    @OneToOne(()=>UserEntity , (user) => user.otp)
    user : UserEntity 
}