import { Body, ClassSerializerInterceptor, Controller, Get, Param, Patch, Post, UseFilters, UseInterceptors } from "@nestjs/common";
import { ApiCreateUser, ApiUserTags } from "src/swagger/user/user.swagger";
import { CreateUserDto } from "src/user/application/dtos/input/CreateUser.dto";
import { LoginUserDto } from "src/user/application/dtos/input/LoginUser.dto";
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

  @Get('/:id')
  async getUser(@Param('id') userId: string) {
    return this.userService.getUser(userId);
  }

  @Post('/register')
  @ApiCreateUser()
  @UseInterceptors(ClassSerializerInterceptor)
  async register(@Body() createUserDto: CreateUserDto) {
    return this.userService.register(createUserDto);
  }

  @Post('/login')
  @ApiCreateUser()
  @UseInterceptors(ClassSerializerInterceptor)
  async login(@Body() loginUserDto: LoginUserDto) {
    return this.userService.login(loginUserDto);
  }

  @Patch('/progress')
  @ApiCreateUser()
  @UseInterceptors(ClassSerializerInterceptor)
  async update(@Body() loginUserDto: LoginUserDto) {
    return this.userService.login(loginUserDto);
  }


}

