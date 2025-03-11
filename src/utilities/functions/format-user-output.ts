import { CreateUserOutputDto } from "src/user/application/dtos/output/CreateUserOutput.dto";
import { UserModel } from "src/user/domain/models/user.model";

export const formatUserOutput = (user: UserModel): CreateUserOutputDto => {
  const userOutput = {
    id: user.getId(),
    firstName: user.getFirstName(),
    lastName: user.getLastName(),
    email: user.getEmail().getValue(),
    difficultyLevel: user.getDifficultyLevel(),
    role: user.getRole(),
    avatar: user.getAvatar(),
    frame: user.getFrame(),
    background: user.getBackground(),
    progress: user.getProgress(),
    coins: user.getCoins(),
    points: user.getPoints(),
    gamesPassed: user.getGamesPassed()
  };

  return userOutput;
}

