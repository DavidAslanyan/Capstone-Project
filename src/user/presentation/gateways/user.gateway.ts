import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';

@WebSocketGateway({ cors: true }) 
export class UserGateway implements OnGatewayConnection, OnGatewayDisconnect {

  private clients = new Set<string>();

  handleConnection(client: any) {
    console.log(`Client connected: ${client.id}`);
    this.clients.add(client.id);
  }

  handleDisconnect(client: any) {
    console.log(`Client disconnected: ${client.id}`);
    this.clients.delete(client.id);
  }

  updateUser(user: any) {
    
  }

  @SubscribeMessage('requestUserUpdate')
  handleUserUpdateRequest(@MessageBody() data: any) {
    console.log("WS: ", data)
    this.updateUser(data);
  }
}
