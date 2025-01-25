import { AccessTokenEntity } from '../entities/access-token.entity';
import { AccessTokenModel } from 'src/user/domain/models/access-token.model';
import { UserMapper } from './user.mapper';

export class AccessTokenMapper {
  static toModel(entity: AccessTokenEntity): AccessTokenModel {
    return new AccessTokenModel(
      UserMapper.toModel(entity.user),
      entity.token,
      entity.expires_at,
      entity.is_active,
      entity.id,
      entity.created_at,
      entity.updated_at,
    );
  }

  static toEntity(model: AccessTokenModel): AccessTokenEntity {
    const entity = new AccessTokenEntity();
    entity.id = model.getId();
    entity.user = UserMapper.toEntity(model.getUser());
    entity.token = model.getToken();
    entity.expires_at = model.getExpiresAt();
    entity.is_active = model.getIsActive();
    entity.created_at = model.getCreatedAt();
    entity.updated_at = model.getUpdatedAt();

    return entity;
  }
}
