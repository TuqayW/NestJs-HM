import { Entity, Column, ObjectIdColumn, BeforeInsert } from "typeorm";
import {v4 } from "uuid";

@Entity()
export class Certificate {

    @ObjectIdColumn()
    id: string

    @Column()
    fullname: string

    @Column()
    company: string

    @Column(({nullable: true}))
    description: string

    @Column()
    title: string

    @Column({unique: true})
    key_Cert: string

    @Column()
    issueDate: Date

    @BeforeInsert()
    generateKeyCert(){
        this.key_Cert = v4().slice(0,8)
    }

}
