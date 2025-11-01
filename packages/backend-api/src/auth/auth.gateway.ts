import {
  OnGatewayConnection,
  WebSocketGateway,
  WebSocketServer,
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { emitWith } from "vtzac/typed-emit";
import { AuthEvents } from "./auth.emitter";

@WebSocketGateway({ cors: { origin: "*" } })
export class AuthGateway implements OnGatewayConnection {
  private readonly events = new AuthEvents();

  @WebSocketServer()
  server!: Server;

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  sendLoginSuccess(jwt: string, session: unknown) {
    emitWith(
      this.events.loginSuccess,
      this.events,
    )({ jwt, session }).toServer(this.server);
  }
}
