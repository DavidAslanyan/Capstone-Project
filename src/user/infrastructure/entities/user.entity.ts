import { ApiProperty } from "@nestjs/swagger";
import { DifficultyLevelEnum } from "../../domain/enums/difficulty-level.enum";
import { UserRoleEnum } from "../../domain/enums/user-role.enum";
import { UserStatusEnum } from "../../domain/enums/user-status.enum";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { AccessTokenEntity } from "./access-token.entity";
import { RefreshTokenEntity } from "./refresh-token.entity";
import { Exclude } from "class-transformer";

@Entity('user')
export class UserEntity {
  @ApiProperty({
    example: '1e4a89f1-efc1-4b5b-8fcb-27b9b62c7b45',
    description: 'ID for the user',
    format: 'uuid',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: 'First name of the user' })
  @Column({ type: 'varchar', length: 255 })
  first_name: string;

  @ApiProperty({ description: 'Last name of the user' })
  @Column({ type: 'varchar', length: 255 })
  last_name: string;

  @ApiProperty({ description: 'Email address of the user', required: false })
  @Column({ type: 'varchar', length: 255, unique: true, nullable: true })
  email: string;

  @ApiProperty({ description: 'Password of the user' })
  @Exclude()
  @Column({ type: 'varchar', length: 255 })
  password: string;

  @ApiProperty({
    description: 'Selected difficulty level',
    enum: DifficultyLevelEnum,
  })
  @Column({ type: 'enum', enum: DifficultyLevelEnum })
  difficulty_level: DifficultyLevelEnum;

  @ApiProperty({
    description: 'Role of the user',
    enum: UserRoleEnum,
  })
  @Column({ type: 'enum', enum: UserRoleEnum })
  role: UserRoleEnum;

  @ApiProperty({
    description: 'Status of the user',
    enum: UserStatusEnum,
  })
  @Column({
    type: 'enum',
    enum: UserStatusEnum,
  })
  status: UserStatusEnum;

  @ApiProperty({
    description: 'Progress of the user'
  })
  @Column({
    type: 'integer',
  })
  progress: number;

  @ApiProperty({
    description: 'Coins of the user'
  })
  @Column({
    type: 'integer',
  })
  coins: number;

  @ApiProperty({
    description: 'Current passed games by the user'
  })
  @Column({
    type: 'text', 
    array: true,
    nullable: true
  })
  games_passed: string[];

  @ApiProperty({ description: 'Avatar url of the user' })
  @Column({ type: 'varchar', length: 255 })
  avatar: string;

  @ApiProperty({ description: 'Frame of the user' })
  @Column({ type: 'varchar', length: 255 })
  frame: string;

  @ApiProperty({
    description: 'Avatars purchased by the user'
  })
  @Column({
    type: 'text', 
    array: true,
    nullable: true
  })
  avatars_purchased: string[];

  @ApiProperty({
    description: 'Frames purchased by the user'
  })
  @Column({
    type: 'text', 
    array: true,
    nullable: true
  })
  frames_purchased: string[];

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

  @OneToMany(() => AccessTokenEntity, (accessToken) => accessToken.user)
  access_tokens: AccessTokenEntity[];

  @OneToMany(() => RefreshTokenEntity, (refreshToken) => refreshToken.user)
  refresh_tokens: RefreshTokenEntity[];
}

