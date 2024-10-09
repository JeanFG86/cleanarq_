import { Registry } from "./infra/di/DI";
import { PgPromiseAdapter } from "./infra/database/DatabaseConnection";
import { ExpressAdapter } from "./infra/http/HttpServer";
import AccountController from "./infra/controller/PaymentController";
import ProcessPayment from "./application/usecase/ProcessPayment";

const httpServer = new ExpressAdapter();
const processPayment = new ProcessPayment();
Registry.getInstance().provide("httpServer", httpServer);
Registry.getInstance().provide("databaseConnection", new PgPromiseAdapter());
Registry.getInstance().provide("processPayment", processPayment);
Registry.getInstance().provide("accountController", new AccountController());
httpServer.listen(3002);
