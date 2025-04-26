import { Module } from "@nestjs/common";
import { UserGateway } from "./user.gateway";

@Module({
  providers: [UserGateway]
})
export class GatewayModule {}