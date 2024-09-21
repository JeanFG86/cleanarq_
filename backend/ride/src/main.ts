import { AccountRepositoryDatabase } from "./AccountRepository";
import { MailerGatewayMemory } from "./MailerGateway";
import GetAccount from "./GetAccount";
import Signup from "./Signup";
import { Registry } from "./DI";
import { PgPromiseAdapter } from "./DatabaseConnection";
import { ExpressAdapter } from "./HttpServer";
import AccountController from "./AccountController";

const httpServer = new ExpressAdapter();
Registry.getInstance().provide("httpServer", httpServer);
Registry.getInstance().provide("databaseConnection", new PgPromiseAdapter());
Registry.getInstance().provide("accountRepository", new AccountRepositoryDatabase());
Registry.getInstance().provide("mailerGateway", new MailerGatewayMemory());
Registry.getInstance().provide("signup", new Signup());
Registry.getInstance().provide("getAccount", new GetAccount());
Registry.getInstance().provide("accountController", new AccountController());
httpServer.listen(3000);
