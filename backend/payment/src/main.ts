import { Registry } from "./infra/di/DI";
import { PgPromiseAdapter } from "./infra/database/DatabaseConnection";
import { ExpressAdapter } from "./infra/http/HttpServer";
import AccountController from "./infra/controller/ProcessPayment";
import ProcessPayment from "./application/usecase/ProcessPayment";
import CieloGateway from "./infra/gateway/CieloGateway";

const httpServer = new ExpressAdapter();
Registry.getInstance().provide("httpServer", httpServer);
Registry.getInstance().provide("databaseConnection", new PgPromiseAdapter());
Registry.getInstance().provide("paymentGateway", new CieloGateway());
Registry.getInstance().provide("processPayment", new ProcessPayment());
Registry.getInstance().provide("accountController", new AccountController());
httpServer.listen(3002);
