import { UserMapper } from './user.mapper';
import { RefreshTokenEntity } from '../entities/refresh-token.entity';
import { RefreshTokenModel } from 'src/user/domain/models/refresh-token.model';

export class RefreshTokenMapper {
  static toModel(entity: RefreshTokenEntity): RefreshTokenModel {
    return new RefreshTokenModel(
      UserMapper.toModel(entity.user),
      entity.token,
      entity.expires_at,
      entity.is_active,
      entity.id,
      entity.created_at,
      entity.updated_at,
    );
  }

  static toEntity(model: RefreshTokenModel): RefreshTokenEntity {
    const entity = new RefreshTokenEntity();
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
