import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { IUserRepository } from '../../../../domain/repositories/user.repository';
import { Inject, NotFoundException } from '@nestjs/common';
import { UserModel } from 'src/user/domain/models/user.model';
import { GetUserByIdQuery } from '../../queries/user/get-by-id.query';
import { ERROR_MESSAGES } from 'src/utilities/constants/response-messages';


@QueryHandler(GetUserByIdQuery)
export class GetUserByIdHandler implements IQueryHandler<GetUserByIdQuery> {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(query: GetUserByIdQuery): Promise<UserModel> {
    const user = await this.userRepository.getUserById(query.id);
    if (!user) {
      throw new NotFoundException(ERROR_MESSAGES.user_not_found);  
    }

    return user;
  }
}
