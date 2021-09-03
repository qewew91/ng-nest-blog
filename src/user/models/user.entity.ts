import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { UserRoles } from '../../types/user-roles.enum'

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number
  @Column()
  name: string
  @Column({ unique: true })
  username: string
  @Column({ unique: true })
  email: string
  @Column()
  password: string
  @Column({ type: 'enum', enum: UserRoles, default: UserRoles.USER })
  role: UserRoles

  constructor(name: string, username: string, email: string, password: string, role = UserRoles.USER) {
    this.name = name
    this.username = username
    this.email = email
    this.password = password
    this.role = role
  }

  @BeforeInsert()
  emailToLowerCase() {
    this.email = this.email.toLowerCase()
  }
}
