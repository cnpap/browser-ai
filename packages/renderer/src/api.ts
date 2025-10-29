import { AppController } from "nestjs/src/app.controller";
import { _http } from "vtzac";

const controller = _http({
  ofetchOptions: {
    baseURL: "http://localhost:3000",
    timeout: 5000,
  },
});

export const app = controller.controller(AppController);
