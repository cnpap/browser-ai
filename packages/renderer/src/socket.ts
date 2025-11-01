import { AuthEvents } from "backend-api/src/auth/auth.emitter";
import { AuthGateway } from "backend-api/src/auth/auth.gateway";
import { _socket } from "vtzac";

export const { createListener, socket, disconnect } = _socket(
  "http://localhost:3999",
  AuthGateway,
  {
    socketIoOptions: { transports: ["websocket"] },
  },
);

export const authEvents = createListener(AuthEvents);
