import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, Patch, Post, Put, Res, UseFilters, UseInterceptors } from "@nestjs/common";
import { ApiCreateUser, ApiUserTags } from "src/swagger/user/user.swagger";
import { ChangeDifficultyLevelDto } from "src/user/application/dtos/input/change-difficulty-level.dto";
import { CreateUserDto } from "src/user/application/dtos/input/create-user.dto";
import { LoginUserDto } from "src/user/application/dtos/input/login-user.dto";
import { UpdateUserDto } from "src/user/application/dtos/input/update-user.dto";
import { HttpExceptionFilter } from "src/user/application/exception-filter/http.exception-filter";
import { UserService } from "src/user/application/services/user.service";
import { BASE_ROUTE } from "src/utilities/constants/urls.constant";


@ApiUserTags
@UseFilters(HttpExceptionFilter)
@Controller(`${BASE_ROUTE}/auth`)
export class UserController {
  constructor(
    private readonly userService: UserService,
  ) {}

  @Get('list')
  async getUsersList() {
    return this.userService.getUsersList();
  }
  
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

  @Patch('/update/:userId')
  async update(
    @Param('userId') userId: string,
    @Body() updateUserDto: UpdateUserDto
  ) {
    return this.userService.updateUser(updateUserDto, userId);
  }

  @Patch('/change-difficulty')
  async changeDifficultyLevel(@Body() difficultyLevelDto: ChangeDifficultyLevelDto) {
    const userId = "b0f7c193-9e89-44eb-9891-aeec0b384159";
    return this.userService.changeDiffcultyLevel(userId, difficultyLevelDto);
  }

  @Delete('/:userId')
  async delete(@Param('userId') userId: string) {
    return this.userService.deleteUser(userId);
  }

}

