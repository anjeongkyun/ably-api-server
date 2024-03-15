import { NODE_ENV, PORT } from "@/api/config";
import { Route } from "@/api/routes/route";
import express from "express";
import { connect, set } from "mongoose";
import cors from "cors";
import compression from "compression";
import { dbConnection } from "@/data-access/databases";
import errorMiddleware from "@/api/middlewares/error.middleware";

class App {
  public app: express.Application;
  public env: string;
  public port: string | number;

  constructor(routes: Route[]) {
    this.app = express();
    this.env = NODE_ENV || "developemnt";
    this.port = PORT || 3000;

    this.connectToDatabase();
    this.initializeMiddlewares();
    this.initializeRoutes(routes);
    this.initializeErrorHandling();
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`=================================`);
      console.log(`🚀 App listening on the port ${this.port}`);
      console.log(`=================================`);
    });
  }

  private initializeRoutes(routes: Route[]) {
    routes.forEach((route) => {
      this.app.use("/", route.router);
    });
  }

  private connectToDatabase() {
    if (this.env === "test") {
      set("debug", true);
    }

    connect(dbConnection.url as string).catch((e) =>
      console.error("Connection error", e.message)
    );
  }

  private initializeMiddlewares() {
    this.app.use(cors());
    this.app.use(compression());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }
}

export default App;
