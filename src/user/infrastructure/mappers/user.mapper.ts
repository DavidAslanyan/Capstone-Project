import { UserModel } from "src/user/domain/models/user.model";
import { UserEntity } from "../entities/user.entity";
import { EmailValueObject } from "src/user/domain/value-objects/email.value-object";

export class UserMapper {
  static toModel(entity: UserEntity): UserModel {
    return new UserModel(
      entity.first_name,
      entity.last_name,
      EmailValueObject.create(entity.email),
      entity.password,
      entity.difficulty_level,
      entity.role,
      entity.status,
      entity.id,
      entity.created_at,
      entity.updated_at,
    );
  }

  static toEntity(model: UserModel): UserEntity {
    const entity = new UserEntity();
    entity.id = model.getId();
    entity.first_name = model.getFirstName();
    entity.last_name = model.getLastName();
    entity.email = model.getEmail().getValue();
    entity.password = model.getPassword();
    entity.difficulty_level = model.getdifficultyLevel();
    entity.role = model.getRole();
    entity.status = model.getStatus();
    entity.created_at = model.getCreatedAt();
    entity.updated_at = model.getUpdatedAt();

    return entity;
  }
}

