import { RoleModel } from 'src/user/domain/models/role.model';
import { RoleEntity } from '../entities/role.entity';

export class RoleMapper {
  static toModel(entity: RoleEntity): RoleModel {
    return new RoleModel(
      entity.title,
      entity.description
    );
  }

  static toEntity(model: RoleModel): RoleEntity {
    const entity = new RoleEntity();
    entity.id = model.getId();
    entity.title = model.getTitle();
    entity.description = model.getDescription();
    entity.created_at = model.getCreatedAt();
    entity.updated_at = model.getUpdatedAt();

    return entity;
  }
}
