import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
} from 'typeorm'

@Entity()
export class Memo extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  text!: string

  @Column()
  title!: string

  @Column()
  author!: string

  @CreateDateColumn({ unique: true })
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
