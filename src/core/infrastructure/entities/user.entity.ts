import { ApiProperty } from "@nestjs/swagger";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('user')
export class UserEntity {
  @ApiProperty({
    example: '1e4a89f1-efc1-4b5b-8fcb-27b9b62c7b45',
    description: 'ID for the user',
    format: 'uuid',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: 'Username of the user' })
  @Column({ type: 'varchar', length: 255, unique: true })
  username: string;

  @ApiProperty({ description: 'Email address of the user', required: false })
  @Column({ type: 'varchar', length: 255, unique: true, nullable: true })
  email: string;

  @ApiProperty({ description: 'Password of the user' })
  @Column({ type: 'varchar', length: 255 })
  password: string;

  @ApiProperty({
    description: 'Timestamp when the record was created',
    default: () => 'CURRENT_TIMESTAMP',
    example: '2024-08-19T12:34:56Z',
  })
  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @ApiProperty({
    description: 'Timestamp when the record was last updated',
    default: () => 'CURRENT_TIMESTAMP',
    example: '2024-08-19T12:34:56Z',
  })
  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;
}