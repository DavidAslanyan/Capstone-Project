import { ApiProperty } from "@nestjs/swagger";
import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { PermissionEntity } from "./permission.entity";
import { UserRoleEnum } from "../../domain/enums/user-role.enum";



@Entity('role')
export class RoleEntity {
  @ApiProperty({
    example: '1e4a89f1-efc1-4b5b-8fcb-27b9b62c7b45',
    description: 'ID for the role',
    format: 'uuid',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;
  
  @ApiProperty({ description: 'Role title' })
  @Column({ type: 'varchar', length: 255 })
  title: UserRoleEnum;

  @ApiProperty({ description: 'Role description' })
  @Column({ type: 'varchar', length: 255 })
  description: string;

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

  @ManyToMany(() => PermissionEntity, permissions => permissions.roles)
  @JoinTable({ name: 'roles_permissions' })
  permissions: PermissionEntity[];

}

