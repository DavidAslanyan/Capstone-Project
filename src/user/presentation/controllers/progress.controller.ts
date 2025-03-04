import { Body, Controller, Post, UseFilters } from "@nestjs/common";
import { AddUserCoinsDto } from "src/user/application/dtos/input/add-user-coins.dto";
import { AddGamePassedDto } from "src/user/application/dtos/input/update-games-passed.dto";
import { HttpExceptionFilter } from "src/user/application/exception-filter/http.exception-filter";
import { ProgressService } from "src/user/application/services/progress.service";
import { BASE_ROUTE } from "src/utilities/constants/urls.constant";


@UseFilters(HttpExceptionFilter)
@Controller(`${BASE_ROUTE}/progress`)
export class ProgressController {
  constructor(
    private readonly progressService: ProgressService
  ) {}

  @Post('games')
  async updateGamesPassed(@Body() addGamePassedDto: AddGamePassedDto ) {
    const userId = "7ac2fe64-c4e2-4bdc-8ed7-0afb3f039e74";
    return this.progressService.addGamePassed(userId, addGamePassedDto.gamePassed);
  }

  @Post('coins')
  async addUserCoins(@Body() addUserCoinsDto: AddUserCoinsDto ) {
    const userId = "7ac2fe64-c4e2-4bdc-8ed7-0afb3f039e74";
    return this.progressService.addUserCoins(userId, addUserCoinsDto.coins);
  }
}

