import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({ 
  cors: {
    origin: 'http://localhost:3001', 
    methods: ['GET', 'POST'],
  },
 }) 
export class UserGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

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
    this.server.emit('update-user', user);
  }

  @SubscribeMessage('requestUserUpdate')
  handleUserUpdateRequest(@MessageBody() data: any) {
    console.log("WS: ", data)
    this.updateUser(data);
  }
}
