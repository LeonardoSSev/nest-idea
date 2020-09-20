import { 
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
 } from 'typeorm';

@Entity({name: 'idea'})
export class IdeaEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({name: 'created_at'})
  createdAt: Date;

  @Column('text')
  idea: string;

  @Column('text')
  description: string;

}