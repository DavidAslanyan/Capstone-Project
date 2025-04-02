import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';


@Entity('access_token')
export class AccessTokenEntity {
  @ApiProperty({
    description: 'ID for the access token',
    example: '1e4a89f1-efc1-4b5b-8fcb-27b9b62c7b45',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: 'Access token value' })
  @Column({ type: 'text' })
  token: string;

  @ApiProperty({ description: 'Expiration timestamp of the access token' })
  @Column({ type: 'timestamp' })
  expires_at: Date;

  @ApiProperty({
    description: 'Indicates whether the token is currently active',
    default: true,
  })
  @Column({ type: 'bool', default: true, nullable: false })
  is_active: boolean;

  @ApiProperty({
    description: 'Timestamp when the record was created',
    default: () => 'CURRENT_TIMESTAMP',
    example: '2025-01-19T12:34:56Z',
  })
  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @ApiProperty({
    description: 'Timestamp when the record was last updated',
    default: () => 'CURRENT_TIMESTAMP',
    example: '2025-01-19T12:34:56Z',
  })
  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;
}
