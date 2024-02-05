import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Application {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50, nullable: true })
  first_name: string;

  @Column({ length: 50, nullable: true })
  last_name: string;

  @Column({ length: 100 })
  email_address: string;

  @Column({ length: 20, nullable: true })
  phone_number: string;

  @Column({ length: 50, nullable: true })
  company_name: string;

  @Column()
  effective_date: Date;

  @Column({ length: 20 })
  status: string;

  @Column({ nullable: true })
  primary_al: boolean;

  @Column({ nullable: true })
  primary_gl: boolean;

  @Column({ nullable: true })
  primary_el: boolean;

  @Column({ default: false })
  is_deleted: boolean;
}
