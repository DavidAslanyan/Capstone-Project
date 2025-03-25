import { Body, Controller, Delete, Get, Param, Patch, Req, UseFilters, UseGuards } from "@nestjs/common";
import { ApiUserTags } from "src/swagger/user/user.swagger";
import { ChangeDifficultyLevelDto } from "src/user/application/dtos/input/change-difficulty-level.dto";
import { UpdateUserDto } from "src/user/application/dtos/input/update-user.dto";
import { HttpExceptionFilter } from "src/user/application/exception-filter/http.exception-filter";
import { UserService } from "src/user/application/services/user.service";
import { BASE_ROUTE } from "src/utilities/constants/urls.constant";
import { JwtAuthGuard } from "../guards/jwt.guard";
import { Request } from "express";


@ApiUserTags
@UseFilters(HttpExceptionFilter)
@Controller(`${BASE_ROUTE}/user`)
export class UserController {
  constructor(
    private readonly userService: UserService,
  ) {}

  @Get('list')
  async getUsersList() {
    return this.userService.getUsersList();
  }
  
  @Get()
  @UseGuards(JwtAuthGuard)
  async getUser(@Req() req: Request) {
    const user = req.user as { sub: string };
    const userId = user.sub;
    return this.userService.getUser(userId);
  }

  @Patch('/update')
  @UseGuards(JwtAuthGuard)
  async update(
    @Req() req: Request,
    @Body() updateUserDto: UpdateUserDto
  ) {
    const user = req.user as { sub: string };
    const userId = user.sub;
    return this.userService.updateUser(updateUserDto, userId);
  }

  @Patch('/change-difficulty')
  @UseGuards(JwtAuthGuard)
  async changeDifficultyLevel(
    @Body() difficultyLevelDto: ChangeDifficultyLevelDto,
    @Req() req: Request
  ) {
    const user = req.user as { sub: string };
    const userId = user.sub;
    return this.userService.changeDiffcultyLevel(userId, difficultyLevelDto);
  }

  @Delete('/:userId')
  @UseGuards(JwtAuthGuard)
  async delete(@Param('userId') userId: string) {
    return this.userService.deleteUser(userId);
  }

}

