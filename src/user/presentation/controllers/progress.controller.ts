import { Body, Controller, Patch, Post, Put, Req, UseFilters, UseGuards } from "@nestjs/common";
import { ApiUpdateUserProgress } from "src/swagger/user/user.swagger";
import { PurchaseStoreItemDto } from "src/user/application/dtos/input/purchase-store-item.dto";
import { AddUserCoinsDto } from "src/user/application/dtos/input/add-user-coins.dto";
import { AddGamePassedDto } from "src/user/application/dtos/input/update-games-passed.dto";
import { UpdateUserProgressDto } from "src/user/application/dtos/input/update-user-progress.dto";
import { HttpExceptionFilter } from "src/user/application/exception-filter/http.exception-filter";
import { ProgressService } from "src/user/application/services/progress.service";
import { BASE_ROUTE } from "src/utilities/constants/urls.constant";
import { AddUserPointsDto } from "src/user/application/dtos/input/add-user-ponts.dto";
import { JwtAuthGuard } from "../guards/jwt.guard";
import { Request } from "express";


@UseFilters(HttpExceptionFilter)
@Controller(`${BASE_ROUTE}/progress`)
export class ProgressController {
  private readonly id = "b0f7c193-9e89-44eb-9891-aeec0b384159";
  constructor(
    private readonly progressService: ProgressService
  ) {}

  @Patch()
  @UseGuards(JwtAuthGuard)
  @ApiUpdateUserProgress()
  async updateProgress(
    @Req() req: Request,
    @Body() updateUserProgress: UpdateUserProgressDto
  ) {
    const user = req.user as { sub: string };
    const userId = user.sub;
    return this.progressService.updateUserProgress(updateUserProgress, userId);
  }

  @Patch('add')
  @UseGuards(JwtAuthGuard)
  @ApiUpdateUserProgress()
  async addProgress(
    @Req() req: Request,
    @Body() updateUserProgress: UpdateUserProgressDto
  ) {
    const user = req.user as { sub: string };
    const userId = user.sub;
    return this.progressService.addProgress(userId, updateUserProgress);
  }

  @Post('game')
  @UseGuards(JwtAuthGuard)
  async updateGamesPassed(
    @Req() req: Request,
    @Body() addGamePassedDto: AddGamePassedDto
  ) {
    const user = req.user as { sub: string };
    const userId = user.sub;
    return this.progressService.addGamePassed(userId, addGamePassedDto.gamePassed);
  }

  @Put('games/clear')
  @UseGuards(JwtAuthGuard)
  async clearPassedGames(@Req() req: Request) {
    const user = req.user as { sub: string };
    const userId = user.sub;
    return this.progressService.clearPassedGames(userId);
  }

  @Patch('add-coins')
  @UseGuards(JwtAuthGuard)
  async addUserCoins(
    @Req() req: Request,
    @Body() addUserCoinsDto: AddUserCoinsDto
  ) {
    const user = req.user as { sub: string };
    const userId = user.sub;
    return this.progressService.addUserCoins(userId, addUserCoinsDto.coins);
  }

  @Patch('subtract-coins')
  @UseGuards(JwtAuthGuard)
  async subtractUserCoins(
    @Req() req: Request,
    @Body() subtractUserCoinsDto: AddUserCoinsDto
  ) {
    const user = req.user as { sub: string };
    const userId = user.sub;
    return this.progressService.subtractUserCoins(userId, subtractUserCoinsDto.coins);
  }

  @Post('purchase')
  @UseGuards(JwtAuthGuard)
  async purchaseStoreItem(
    @Req() req: Request,
    @Body() purchaseStoreItemDto: PurchaseStoreItemDto
  ) {
    const user = req.user as { sub: string };
    const userId = user.sub;
    return this.progressService.purchaseStoreItem(userId, purchaseStoreItemDto)
  }

  @Patch('add-points')
  @UseGuards(JwtAuthGuard)
  async addUserPoints(
    @Req() req: Request,
    @Body() addUserPointsDto: AddUserPointsDto
  ) {
    const user = req.user as { sub: string };
    const userId = user.sub;
    return this.progressService.addUserPoints(userId, addUserPointsDto.points);
  }

}

