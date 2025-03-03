import { Body, Controller, Post, UseFilters } from "@nestjs/common";
import { AddUserCoinsDto } from "src/user/application/dtos/input/add-user-coins.dto";
import { UpdateGamesPassedDto } from "src/user/application/dtos/input/update-games-passed.dto";
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
  async updateGamesPassed(@Body() updateGamesPasedDto: UpdateGamesPassedDto ) {
    const userId = "fcae8e76-1a1d-4fba-ae7a-df9ab09b3d8b";
    return this.progressService.updateGamesPassed(userId, updateGamesPasedDto.gamesPassed);
  }

  @Post('coins')
  async addUserCoins(@Body() addUserCoinsDto: AddUserCoinsDto ) {
    const userId = "fcae8e76-1a1d-4fba-ae7a-df9ab09b3d8b";
    return this.progressService.addUserCoins(userId, addUserCoinsDto.coins);
  }
}

