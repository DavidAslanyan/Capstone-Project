import { Body, ClassSerializerInterceptor, Controller, Post, UseFilters, UseInterceptors } from "@nestjs/common";
import { ApiCreateUser, ApiUserTags } from "src/swagger/user/user.swagger";
import { CreateUserDto } from "src/user/application/dtos/input/CreateUser.dto";
import { HttpExceptionFilter } from "src/user/application/exception-filter/http.exception-filter";
import { UserService } from "src/user/application/services/user.service";
import { BASE_ROUTE } from "src/utilities/constants/urls.constant";


@ApiUserTags
@UseFilters(HttpExceptionFilter)
@Controller(`${BASE_ROUTE}/user`)
export class UserController {
  constructor(
    private readonly userService: UserService
  ) {}

  @Post()
  @ApiCreateUser()
  @UseInterceptors(ClassSerializerInterceptor)
  async register(@Body() createUserDto: CreateUserDto) {
    return this.userService.register(createUserDto);
  }
}

