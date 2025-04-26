import { PermissionModel } from 'src/user/domain/models/permission.model';
import { PermissionEntity } from '../entities/permission.entity';

export class PermissionMapper {
  static toModel(entity: PermissionEntity): PermissionModel {
    return new PermissionModel(
      entity.title,
      entity.description
    );
  }

  static toEntity(model: PermissionModel): PermissionEntity {
    const entity = new PermissionEntity();
    entity.id = model.getId();
    entity.title = model.getTitle();
    entity.description = model.getDescription();
    entity.created_at = model.getCreatedAt();
    entity.updated_at = model.getUpdatedAt();

    return entity;
  }
}
