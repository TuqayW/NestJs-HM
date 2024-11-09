import {Entity , Column, ObjectIdColumn } from 'typeorm'

@Entity()
export class User{
    @ObjectIdColumn()
    id: string;

    @Column({ unique: true })
    email: string;

    @Column()
    fullname: string;

    @Column()
    passhash: string;

}